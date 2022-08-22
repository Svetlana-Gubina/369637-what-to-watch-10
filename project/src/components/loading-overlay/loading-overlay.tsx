import React from 'react';

function LoadingOverlay(): JSX.Element {
  return (
    <div
      style={{
        color: 'wheat',
        background: 'rgba(0, 0, 0, 0.5)',
        width: '100vw',
        height: '100vh',
        margin: '0',
        padding: '0',
        position: 'fixed',
        top: '0',
        right: '0',
        zIndex: '100',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '25px',
        textAlign: 'center',
      }}
    >
      <p>Loading...</p>
    </div>
  );
}

export default LoadingOverlay;
