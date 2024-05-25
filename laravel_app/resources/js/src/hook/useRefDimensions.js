import { useEffect, useState } from 'react';

export const useRefDimensions = (observedDiv) => {
  const [height, setHeight] = useState(96);
  if (!observedDiv) return height;
  const handleElementResized = () => {
    if (observedDiv.current?.offsetHeight !== height) {
      setHeight(observedDiv.current?.offsetHeight);
    }
  };
  const resizeObserver = (observedDiv && observedDiv.current)
    ? new ResizeObserver(handleElementResized) : null;
  useEffect(() => {
    resizeObserver?.observe(observedDiv.current);
    return function cleanup() {
      resizeObserver?.disconnect();
    };
  });
  return height;
};
