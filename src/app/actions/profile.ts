'use server';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase";

export async function uploadImage(file: File, path: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { data, error } = await supabaseAdmin.storage
    .from('pets')
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true
    });

  if (error) {
    // バケットが存在しない可能性を考慮して自動作成を試みる（初回のみ）
    if (error.message.toLowerCase().includes('bucket not found')) {
       try {
         await supabaseAdmin.storage.createBucket('pets', { public: true });
         return uploadImage(file, path);
       } catch (createError) {
         console.error('Failed to create bucket:', createError);
         throw error;
       }
    }
    throw error;
  }

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('pets')
    .getPublicUrl(path);

  return publicUrl;
}

export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      pets: {
        include: {
          medicalRecords: true,
          vaccineRecords: {
            orderBy: { createdAt: 'desc' }
          },
          tags: true,
        }
      }
    }
  });

  return user;
}

export async function saveProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  // User info
  const name = formData.get('name') as string;
  const address = formData.get('address') as string;
  const phone = formData.get('phone') as string;
  const sosMessage = formData.get('sosMessage') as string;
  const sosContactName = formData.get('sosContactName') as string;
  const sosContactPhone = formData.get('sosContactPhone') as string;

  // Pet info
  const petId = formData.get('petId') as string;
  const petName = formData.get('petName') as string;
  const petGender = formData.get('gender') as string;
  const petBreed = formData.get('petBreed') as string;
  const petAgeText = formData.get('petAgeText') as string;
  const petBirthday = formData.get('petBirthday') as string;
  const petWeight = formData.get('petWeight') as string;
  const petColor = formData.get('petColor') as string;
  const petDescription = formData.get('petDescription') as string;
  const petInstagram = formData.get('petInstagram') as string;
  const petImage = formData.get('petImage') as File;

  let imageUrl = formData.get('currentImageUrl') as string || null;

  // Medical info
  const medicalId = formData.get('medicalId') as string;
  const chronicDiseases = formData.get('chronicDiseases') as string;
  const medications = formData.get('medications') as string;
  const vetClinicName = formData.get('vetClinicName') as string;
  const vetClinicPhone = formData.get('vetClinicPhone') as string;
  const vetClinicAddress = formData.get('vetClinicAddress') as string;
  const specialNotes = formData.get('specialNotes') as string;

  // 画像のアップロード
  if (petImage && petImage.size > 0) {
    const path = `${user.id}/${Date.now()}_${petImage.name}`;
    imageUrl = await uploadImage(petImage, path);
  }

  // ユーザー情報の更新
  await prisma.user.update({
    where: { id: user.id },
    data: { 
      name, 
      address, 
      phone, 
      sos_message: sosMessage,
      sos_contact_name: sosContactName,
      sos_contact_phone: sosContactPhone
    }
  });

  // ペット情報の更新（存在する場合のみ）
  let currentPetId = petId;
  if (!currentPetId && petName) {
    // 新規作成
    const newPet = await prisma.pet.create({
      data: {
        owner_id: user.id,
        name: petName,
        species: 'DOG',
        gender: petGender,
        breed: petBreed,
        age_text: petAgeText,
        weight: petWeight,
        color: petColor,
        description: petDescription,
        instagram_id: petInstagram,
        image_url: imageUrl,
      }
    });
    currentPetId = newPet.id;
  } else if (currentPetId) {
    // 更新
    await prisma.pet.update({
      where: { id: currentPetId },
      data: {
        name: petName,
        gender: petGender,
        breed: petBreed,
        age_text: petAgeText,
        birthday: petBirthday,
        weight: petWeight,
        color: petColor,
        description: petDescription,
        instagram_id: petInstagram,
        image_url: imageUrl,
      }
    });
  }

  // ペットに紐づくQRタグ（Tag）が存在しない場合は自動発行する
  if (currentPetId) {
    const existingTag = await prisma.tag.findFirst({
      where: { pet_id: currentPetId }
    });
    if (!existingTag) {
      await prisma.tag.create({
        data: { pet_id: currentPetId }
      });
    }
  }

  // MedicalRecordの更新または作成
  if (currentPetId && (chronicDiseases || medications || vetClinicName || vetClinicPhone || vetClinicAddress || specialNotes)) {
    if (medicalId) {
      await prisma.medicalRecord.update({
        where: { id: medicalId },
        data: {
          chronic_diseases: chronicDiseases,
          medications: medications,
          vet_clinic_name: vetClinicName,
          vet_clinic_phone: vetClinicPhone,
          vet_clinic_address: vetClinicAddress,
          special_notes: specialNotes
        }
      });
    } else {
      await prisma.medicalRecord.create({
        data: {
          pet_id: currentPetId,
          chronic_diseases: chronicDiseases,
          medications: medications,
          vet_clinic_name: vetClinicName,
          vet_clinic_phone: vetClinicPhone,
          vet_clinic_address: vetClinicAddress,
          special_notes: specialNotes
        }
      });
    }
  }

  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}

export async function saveVaccineRecord(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const petId = formData.get('petId') as string;
  const recordId = formData.get('recordId') as string;
  const type = formData.get('type') as string; // 'rabies' or 'mixed'
  const dateStr = formData.get('date') as string;
  const certificateFile = formData.get('certificate') as File;

  if (!petId || !dateStr) throw new Error("Missing parameters");

  let certificateUrl = formData.get('currentCertificateUrl') as string || null;

  if (certificateFile && certificateFile.size > 0) {
    const path = `vaccines/${petId}/${Date.now()}_${certificateFile.name}`;
    certificateUrl = await uploadImage(certificateFile, path);
  }

  const date = new Date(dateStr);

  const data: any = {};
  if (type === 'rabies') {
    data.rabies_date = date;
  } else {
    data.mixed_date = date;
  }
  data.certificateUrl = certificateUrl;

  if (recordId) {
    await prisma.vaccineRecord.update({
      where: { id: recordId },
      data
    });
  } else {
    await prisma.vaccineRecord.create({
      data: {
        pet_id: petId,
        ...data
      }
    });
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function toggleLostMode(petId: string, isLost: boolean) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  await prisma.pet.update({
    where: { id: petId },
    data: { is_lost: isLost }
  });

  revalidatePath('/dashboard');
  return { success: true };
}

export async function deletePet(petId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  const pet = await prisma.pet.findUnique({
    where: { id: petId }
  });

  if (!pet || pet.owner_id !== user.id) {
    throw new Error("Target pet not found or unauthorized");
  }

  await prisma.pet.delete({
    where: { id: petId }
  });

  revalidatePath('/profile');
  revalidatePath('/dashboard');
  return { success: true };
}
