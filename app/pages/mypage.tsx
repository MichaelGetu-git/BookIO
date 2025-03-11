import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export function Mypage() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    async function createPdf() {
        const pdfDoc = await PDFDocument.create();
        const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const fontSize = 30;

        page.drawText('Creating PDFs in JavaScript is awesome!', {
            x: 50,
            y: height - 4 * fontSize,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0.53, 0.71),
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
        setIsOpen(true);
    }

    return (
        <div className="p-10 flex flex-col items-center">
            <button 
                onClick={createPdf} 
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
                Generate PDF
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-3/4 h-3/4">
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                        <iframe src={pdfUrl} className="w-full h-full border-none"></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
