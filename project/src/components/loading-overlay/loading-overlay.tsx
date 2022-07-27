import React from 'react';

function LoadingOverlay(): JSX.Element {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '0',
        right: '0',
        left: '0',
        background: 'rgba(0 0 0 0.5)',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'wheat',
      }}
    >
      Loading...
    </div>
  );
}

export default LoadingOverlay;
