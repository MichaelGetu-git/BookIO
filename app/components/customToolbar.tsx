import * as React from 'react';
import { type RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { type RenderCurrentScaleProps, type RenderZoomInProps, type RenderZoomOutProps } from '@react-pdf-viewer/zoom';
import { FullScreenIcon, fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { toolbarPlugin, type ToolbarSlot } from '@react-pdf-viewer/toolbar';

interface CustomToolbarProps {
    toolbarPluginInstance: ReturnType<typeof toolbarPlugin>;
    fullScreenPluginInstance: ReturnType<typeof fullScreenPlugin>;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ toolbarPluginInstance, fullScreenPluginInstance }) => {
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div
            style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                display: 'flex',
                padding: '4px',
            }}
        >
            <Toolbar>
                {(props: ToolbarSlot) => {
                    const {
                        CurrentPageInput,
                        CurrentScale,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ZoomIn,
                        ZoomOut,
                        EnterFullScreen
                    } = props;

                    return (
                        <>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomOut>
                                    {(props: RenderZoomOutProps) => (
                                        <button
                                            style={{
                                                backgroundColor: '#357edd',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#ffffff',
                                                cursor: 'pointer',
                                                padding: '8px',
                                            }}
                                            onClick={props.onClick}
                                        >
                                            Zoom Out
                                        </button>
                                    )}
                                </ZoomOut>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <CurrentScale>
                                    {(props: RenderCurrentScaleProps) => (
                                        <span>{`${Math.round(props.scale * 100)}%`}</span>
                                    )}
                                </CurrentScale>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomIn>
                                    {(props: RenderZoomInProps) => (
                                        <button
                                            style={{
                                                backgroundColor: '#357edd',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#ffffff',
                                                cursor: 'pointer',
                                                padding: '8px',
                                            }}
                                            onClick={props.onClick}
                                        >
                                            Zoom In
                                        </button>
                                    )}
                                </ZoomIn>
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <GoToPreviousPage>
                                    {(props: RenderGoToPageProps) => (
                                        <button
                                            style={{
                                                backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#ffffff',
                                                cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                                padding: '8px',
                                            }}
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            Previous Page
                                        </button>
                                    )}
                                </GoToPreviousPage>
                            </div>
                            <div style={{ padding: '0px 2px', width: '4rem' }}>
                                <CurrentPageInput />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                / <NumberOfPages />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <GoToNextPage>
                                    {(props: RenderGoToPageProps) => (
                                        <button
                                            style={{
                                                backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#ffffff',
                                                cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                                padding: '8px',
                                            }}
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            Next Page
                                        </button>
                                    )}
                                </GoToNextPage>
                            </div>
                            {/* Fullscreen button */}
                            <div style={{ padding: '0px 2px' }}>
                                <EnterFullScreen
                                >
                                </EnterFullScreen>
                            </div>
                        </>
                    );
                }}
            </Toolbar>
        </div>
    );
};

export default CustomToolbar;
