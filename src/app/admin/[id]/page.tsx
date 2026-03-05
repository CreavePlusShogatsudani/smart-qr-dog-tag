import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { PetDashboard } from '@/components/PetDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPetDetail({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const { id } = await params

    // ペット情報取得
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet || (userId && pet.userId !== userId)) {
        notFound()
    }

    // 他にペットがいるかチェック
    const otherPetsCount = userId ? await prisma.pet.count({
        where: { userId, id: { not: id } }
    }) : 0

    // リクエストヘッダーからホスト名を動的に取得
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const baseUrl = `${protocol}://${host}`
    const publicProfileUrl = `${baseUrl}/profile/${pet.id}`

    return (
        <PetDashboard
            pet={pet}
            publicProfileUrl={publicProfileUrl}
            otherPetsCount={otherPetsCount}
        />
    )
}
