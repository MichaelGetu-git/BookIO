import * as React from 'react';
import { type RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { type RenderCurrentScaleProps, type RenderZoomInProps, type RenderZoomOutProps } from '@react-pdf-viewer/zoom';
import { FullScreenIcon, fullScreenPlugin } from '@react-pdf-viewer/full-screen';
import { toolbarPlugin, type ToolbarSlot } from '@react-pdf-viewer/toolbar';

interface CustomToolbarProps {
    toolbarPluginInstance: ReturnType<typeof toolbarPlugin>;
    fullScreenPluginInstance: ReturnType<typeof fullScreenPlugin>;
    fileName: string;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ toolbarPluginInstance, fullScreenPluginInstance, fileName }) => {
    const { Toolbar } = toolbarPluginInstance;

    return (
        <div
            style={{
                alignItems: 'center',
                backgroundColor: 'white',
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
                                            
                                            className='font-normal text-4xl px-3'
                                            onClick={props.onClick}
                                        >
                                            <img src="/images/zoom.png" alt=""  className='w-7 h-7' />
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
                                            className='font-normal text-4xl px-3'
                                            onClick={props.onClick}
                                        >
                                            <img src="/images/zoom-in.png" alt=""  className='w-7 h-7' />
                                        </button>
                                    )}
                                </ZoomIn>
                            </div>
                            <div style={{flexGrow: 1, textAlign: 'center'}}>
                                {fileName}
                            </div>
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <GoToPreviousPage>
                                    {(props: RenderGoToPageProps) => (
                                        <button
                                            className=''
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            <img src="/images/left-arrow.png" alt=""  className='w-4 h-4' />
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
                            <div style={{ padding: '0px 2px ' }}>
                                <GoToNextPage>
                                    {(props: RenderGoToPageProps) => (
                                        <button
                                            className='pr-10'
                                            disabled={props.isDisabled}
                                            onClick={props.onClick}
                                        >
                                            <img src="/images/right.png" alt=""  className='w-7 h-7' />
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
