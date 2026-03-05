import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const STORAGE_BUCKET = 'pet-images'

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const petId = formData.get('petId') as string | null

    if (!file || !petId) {
        return NextResponse.json({ error: 'Missing file or petId' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

    const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
    const path = `${petId}/profile.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(path, buffer, { contentType: file.type, upsert: true })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data } = supabaseAdmin.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    return NextResponse.json({ url: data.publicUrl })
}
