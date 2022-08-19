import React from 'react';

function LoadingComponent({size}) {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
      <p className="text-md font-bold text-gray-400 ">Processing...</p>
    </div>
  );
}

export default LoadingComponent;
