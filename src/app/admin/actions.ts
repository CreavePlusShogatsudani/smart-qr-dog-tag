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
    const features = formData.get('features') as string | null

    if (!name || !ownerName || !phoneNumber) {
        throw new Error('必須項目が入力されていません')
    }

    const pet = await prisma.pet.create({
        data: {
            name,
            ownerName,
            phoneNumber,
            email,
            features,
            userId, // ユーザー紐付け
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
    const features = formData.get('features') as string | null

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
            features,
        }
    })

    revalidatePath('/admin')
    revalidatePath(`/admin/${id}`)
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
