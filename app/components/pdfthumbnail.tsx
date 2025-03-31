import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function PdfThumbnail({ pdfUrl, bookName }) {
    const [thumbnail, setThumbnail] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    
    const handleClick = () => {
        navigate(`/bookreader/${encodeURIComponent(pdfUrl)}`)
    }
    useEffect(() => {
        import('pdfjs-dist').then(pdfjsLib => {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

            async function renderFirstPage() {

                try {
                    setLoading(true);
                    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
                    const page = await pdf.getPage(1);
                    const scale = 2;
                    const viewport = page.getViewport({ scale });

                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    await page.render({ canvasContext: context, viewport }).promise;
                    setThumbnail(canvas.toDataURL());
                    setLoading(false);
                } catch (err) {
                    setError("Error loading PDF: " + err.message);
                }
            }

            renderFirstPage();
        }).catch((err) => {
            setError("Error loading pdf.js: " + err.message);
            setLoading(false);
        });


        return () => {
            setThumbnail("");
            setLoading(true);
            setError(null);
        };
    }, [pdfUrl]);

    if (!pdfUrl) return null;
    if (error) {
        return <p>Error: {error}</p>;
    }
    const bookTitle = (bookName || "").replace(/\.[^/.]+$/,"")

    return loading ? <p>Loading....</p> 
            : 
        <div>
                <button onClick={handleClick}
                className='p-2'
            >
                <img src={thumbnail} alt="pdf preview" className='w-[200px] h-[250px] border border-gray-200 rounded-md'/>
                <h4 className='font-bold p-2 text-sm'>{bookTitle}</h4>
            </button>
        </div>
}

export default PdfThumbnail;
