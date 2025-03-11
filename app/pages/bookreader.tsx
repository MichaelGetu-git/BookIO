import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const BookReader = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [pageNumber, setPageNumber] = React.useState(1);
    const [highlightedText, setHighlightedText] = React.useState(null);

    const handleHighlight = (start, end) => {
        setHighlightedText({ start, end });
    };

    const handleNextPage = () => {
        setPageNumber(prev => prev + 1);
    };

    const handlePrevPage = () => {
        setPageNumber(prev => Math.max(1, prev - 1));
    };

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    height: '750px',
                    width: '900px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative', // For positioning overlays
                }}
            >
                {/* Custom navigation buttons */}
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <button onClick={handlePrevPage} disabled={pageNumber <= 1}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>

                {/* Highlighting area */}
                {highlightedText && (
                    <div
                        style={{
                            position: 'absolute',
                            left: `${highlightedText.start}px`, // You can calculate the exact positions dynamically
                            top: '50px',
                            backgroundColor: 'rgba(255, 255, 0, 0.5)',
                            width: `${highlightedText.end - highlightedText.start}px`,
                            height: '20px', // Customize height based on text
                        }}
                    />
                )}

                {/* PDF Viewer */}
                <Viewer
                    fileUrl="/CGAssignment.pdf"
                    pageIndex={pageNumber - 1} // Adjusting based on pageIndex
                    plugins={[defaultLayoutPluginInstance]}
                    onPageChange={(e) => {
                        setPageNumber(e.currentPage);
                    }}
                />
            </div>
        </Worker>
    );
};

export default BookReader;
