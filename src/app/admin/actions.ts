'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function createPet(formData: FormData) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        throw new Error('Unauthorized')
    }

    const name = formData.get('name') as string
    const ownerName = formData.get('ownerName') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const email = formData.get('email') as string | null
    const breed = formData.get('breed') as string | null
    const age = formData.get('age') as string | null
    const weight = formData.get('weight') as string | null
    const color = formData.get('color') as string | null
    const features = formData.get('features') as string | null
    const instagram = formData.get('instagram') as string | null
    const imageUrl = formData.get('imageUrl') as string | null
    const medicalHistory = formData.get('medicalHistory') as string | null
    const medication = formData.get('medication') as string | null
    const clinicName = formData.get('clinicName') as string | null
    const clinicPhone = formData.get('clinicPhone') as string | null
    const medicalNotes = formData.get('medicalNotes') as string | null
    const address = formData.get('address') as string | null

    if (!name || !ownerName || !phoneNumber) {
        throw new Error('必須項目が入力されていません')
    }

    const pet = await prisma.pet.create({
        data: {
            name,
            ownerName,
            phoneNumber,
            email,
            breed,
            age,
            weight,
            color,
            features,
            instagram,
            imageUrl: imageUrl || null,
            medicalHistory,
            medication,
            clinicName,
            clinicPhone,
            medicalNotes,
            address,
            userId,
        }
    })

    revalidatePath('/admin')
    redirect(`/admin/${pet.id}`)
}

export async function updatePet(id: string, formData: FormData) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        throw new Error('Unauthorized')
    }

    // 所有者チェック
    const existingPet = await prisma.pet.findUnique({ where: { id } })
    if (!existingPet || existingPet.userId !== userId) {
        throw new Error('Not found or Unauthorized')
    }

    const name = formData.get('name') as string
    const ownerName = formData.get('ownerName') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const email = formData.get('email') as string | null
    const breed = formData.get('breed') as string | null
    const age = formData.get('age') as string | null
    const weight = formData.get('weight') as string | null
    const color = formData.get('color') as string | null
    const features = formData.get('features') as string | null
    const instagram = formData.get('instagram') as string | null
    const imageUrl = formData.get('imageUrl') as string | null
    const medicalHistory = formData.get('medicalHistory') as string | null
    const medication = formData.get('medication') as string | null
    const clinicName = formData.get('clinicName') as string | null
    const clinicPhone = formData.get('clinicPhone') as string | null
    const medicalNotes = formData.get('medicalNotes') as string | null
    const address = formData.get('address') as string | null

    if (!name || !ownerName || !phoneNumber) {
        throw new Error('必須項目が入力されていません')
    }

    await prisma.pet.update({
        where: { id },
        data: {
            name,
            ownerName,
            phoneNumber,
            email,
            breed,
            age,
            weight,
            color,
            features,
            instagram,
            imageUrl: imageUrl || null,
            medicalHistory,
            medication,
            clinicName,
            clinicPhone,
            medicalNotes,
            address,
        }
    })

    revalidatePath('/admin')
    revalidatePath(`/admin/${id}`)
    revalidatePath(`/profile/${id}`)
    redirect(`/admin/${id}`)
}

export async function deletePet(id: string) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        throw new Error('Unauthorized')
    }

    // 所有者チェック
    const existingPet = await prisma.pet.findUnique({ where: { id } })
    if (!existingPet || existingPet.userId !== userId) {
        throw new Error('Not found or Unauthorized')
    }

    await prisma.pet.delete({
        where: { id }
    })

    revalidatePath('/admin')
    redirect('/admin')
}

export async function toggleEmergencyMode(id: string, isEmergency: boolean) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
        throw new Error('Unauthorized')
    }

    // 所有者チェック
    const existingPet = await prisma.pet.findUnique({ where: { id } })
    if (!existingPet || existingPet.userId !== userId) {
        throw new Error('Not found or Unauthorized')
    }

    await prisma.pet.update({
        where: { id },
        data: { isEmergency }
    })

    revalidatePath('/admin')
    revalidatePath(`/admin/${id}`)
    revalidatePath(`/profile/${id}`)
}
