'use client'

import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'

export function QRCodeDisplay({ url }: { url: string }) {
    const downloadQR = () => {
        const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement
        if (!canvas) return

        const pngUrl = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream')

        const downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = 'qr-code.png'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 inline-block mb-4 overflow-hidden">
                <QRCodeCanvas
                    id="qr-canvas"
                    value={url}
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"H"}
                    includeMargin={false}
                    className="rounded-lg"
                />
            </div>
            <button
                type="button"
                onClick={downloadQR}
                className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-lg shadow-md transition-all text-sm font-semibold w-full max-w-[200px]"
            >
                <Download size={18} />
                QRコードを保存
            </button>
        </div>
    )
}
