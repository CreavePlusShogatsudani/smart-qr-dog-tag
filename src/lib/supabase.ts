import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)

export const STORAGE_BUCKET = 'pet-images'

export function isSupabaseConfigured(): boolean {
    return Boolean(supabaseUrl && supabaseAnonKey)
}

export function getPublicImageUrl(path: string): string {
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
    return data.publicUrl
}
