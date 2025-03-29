import * as React from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { type RenderZoomOutProps } from '@react-pdf-viewer/zoom';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { highlightPlugin, type RenderHighlightsProps, type RenderHighlightContentProps, type RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import { searchPlugin, type RenderSearchProps, NextIcon,PreviousIcon } from '@react-pdf-viewer/search';
import { 
    Button,
    MinimalButton,
    Tooltip,
    Position,
    
} from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import CustomToolbar from '~/components/customToolbar';
import { useLocation, useParams } from 'react-router';

const BookReader = () => {
    const [fileName, setFileName] = React.useState('IML NOTES - Michael Getu.PDF');
    const [scale, setScale] = React.useState<number>(1);
    const { pdfUrl } = useParams();
    const decodedPdfUrl = decodeURIComponent(pdfUrl || '')
    // Create plugins
    const searchPluginInstance = searchPlugin();
    const {Search}  = searchPluginInstance;
    const fullScreenPluginInstance = fullScreenPlugin();
    const toolbarPluginInstance = toolbarPlugin();

    console.log(pdfUrl)
    // Create a state to store highlights/notes
    const [notes, setNotes] = React.useState<Array<any>>([]);

    // Simple icon component
    const SimpleIcon = ({ letter, title }) => (
        <div style={{ 
            width: '24px', 
            height: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontWeight: 'bold'
        }} title={title}>
            {letter}
        </div>
    );

    // Toolbar plugin
    // Inside your BookReader component
const handleZoomIn = () => {
    setScale(prevScale => prevScale + 0.1); // Zoom in
};

const handleZoomOut = () => {
    setScale(prevScale => Math.max(0.5, prevScale - 0.1)); // Zoom out but prevent scale from going below 0.5
};

const renderToolbar = (
    <div className="pdf-toolbar" style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '4px 8px',
        width: '100%',
        justifyContent: 'space-between'
    }}>
        {/* Left section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Back button */}
            <MinimalButton>
                <SimpleIcon letter="←" title="Back" />
            </MinimalButton>

            {/* Search button */}
        </div>

        {/* Center - Title */}
        <div style={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: '0 16px',
            color: 'black'
        }}>
            {fileName}
        </div>

        {/* Right section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Comment/note button */}
            <MinimalButton>
                <SimpleIcon letter="C" title="Comment" />
            </MinimalButton>

            {/* Zoom controls */}
            <MinimalButton onClick={handleZoomOut}>
                <SimpleIcon letter="−" title="Zoom Out" />
            </MinimalButton>

            <MinimalButton onClick={handleZoomIn}>
                <SimpleIcon letter="+" title="Zoom In" />
            </MinimalButton>

            {/* Fullscreen button */}
            <MinimalButton onClick={fullScreenPluginInstance.EnterFullScreenButton}>
                <SimpleIcon letter="F" title="Fullscreen" />
            </MinimalButton>
        </div>
    </div>
);

    
        // Render the target which indicates the highlighted area
        const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
            <div
                style={{
                    background: '#eee',
                    display: 'flex',
                    position: 'absolute',
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                    transform: 'translate(0, 8px)',
                    zIndex: 1,
                }}
            >
                <Button
                    onClick={()=> {
                        const newNote = {
                            id: `highlight-${Date.now()}`,
                            content: '',
                            highlightAreas: props.highlightAreas,
                            quote: props.selectedText
                        };
    
                        setNotes([...notes, newNote]);
                        props.cancel();
                    }}
                >
                    Highlight
                </Button>
            </div>
        );
    
        // Render the content of the highlight (the note)
        const renderHighlightContent = (props: RenderHighlightContentProps) => {
            return (
                <div
                    style={{
                        background: '#fff',
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        borderRadius: '2px',
                        padding: '8px',
                        position: 'absolute',
                        left: `${props.selectionRegion.left}%`,
                        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
                        transform: 'translate(0, 8px)',
                        zIndex: 1,
                    }}
                >
                    {/* Empty content for now */}
                </div>
            );
        };
    
        // Render all highlights using the implementation you provided
        const renderHighlights = (props: RenderHighlightsProps) => (
            <div>
                {notes.map((note) => (
                    <React.Fragment key={note.id}>
                        {note.highlightAreas
                            // Filter all highlights on the current page
                            .filter((area) => area.pageIndex === props.pageIndex)
                            .map((area, idx) => (
                                <div
                                    key={idx}
                                    style={Object.assign(
                                        {},
                                        {
                                            background: 'yellow',
                                            opacity: 0.4,
                                        },
                                        props.getCssProperties(area, props.rotation)
                                    )}
                                />
                            ))}
                    </React.Fragment>
                ))}
            </div>
        );
    
        const highlightPluginInstance = highlightPlugin({
            renderHighlightContent,
            renderHighlightTarget,
            renderHighlights,
        });
    
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Custom toolbar */}
            <CustomToolbar
                toolbarPluginInstance={toolbarPluginInstance}
                fullScreenPluginInstance={fullScreenPluginInstance}
            />
            
            {/* PDF viewer */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={decodedPdfUrl}
                        plugins={[
                            toolbarPluginInstance,
                            fullScreenPluginInstance,
                            highlightPluginInstance,
                        ]}
                        scale={scale}
                        defaultScale={1.5}
                        renderToolbar={() => <></>} // Hide default toolbar
                    />
                </Worker>
            </div>
        </div>
    );
};

export default BookReader;