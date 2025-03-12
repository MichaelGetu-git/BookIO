  // Toolbar plugin
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
                
                {/* Thumbnail/outline view button */}
                <MinimalButton>
                    <SimpleIcon letter="T" title="Thumbnails" />
                </MinimalButton>
                
                {/* Text size/zoom controls */}
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
                            Zoom out
                        </button>
                    )}
                </ZoomOut>;
                <MinimalButton onClick={() => setScale(scale => scale + 0.1)}>
                    <SimpleIcon letter="+" title="Zoom In" />
                </MinimalButton>
                
                {/* Fullscreen button */}
                <MinimalButton onClick={fullScreenPluginInstance.toggleFullScreen}>
                    <SimpleIcon letter="F" title="Fullscreen" />
                </MinimalButton>
            </div>
        </div>
    );
    