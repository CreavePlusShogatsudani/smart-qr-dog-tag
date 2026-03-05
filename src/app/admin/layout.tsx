export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm py-4 px-6 md:px-8 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                    <span className="text-blue-600">🐾</span> QR迷子ペット管理
                </h1>
            </header>
            <main className="flex-grow p-6 md:p-8 max-w-5xl mx-auto w-full">
                {children}
            </main>
        </div>
    )
}
