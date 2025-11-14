import { useEffect, useMemo, useState } from "react";

interface DesktopIconProps {
  iconSrc: string;
  label: string;
  onDoubleClick: () => void;
}

const DesktopIcon = ({ iconSrc, label, onDoubleClick }: DesktopIconProps) => {
  const [clicks, setClicks] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [processedSrc, setProcessedSrc] = useState<string>(iconSrc);

  useEffect(() => {
    let isMounted = true;
    const makeWhiteTransparent = async (src: string) => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("icon load error"));
          img.src = src;
        });
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Treat near-white as background and make transparent
        const threshold = 245; // 0-255; higher = more aggressive removal
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r >= threshold && g >= threshold && b >= threshold) {
            data[i + 3] = 0; // alpha
          }
        }
        ctx.putImageData(imageData, 0, 0);
        const url = canvas.toDataURL("image/png");
        if (!isMounted) return;
        setProcessedSrc(url);
      } catch {
        // Fallback to original on any error
        if (isMounted) setProcessedSrc(src);
      }
    };
    setProcessedSrc(iconSrc);
    makeWhiteTransparent(iconSrc);
    return () => {
      isMounted = false;
    };
  }, [iconSrc]);

  const handleClick = () => {
    setIsSelected(true);
    setClicks(clicks + 1);

    if (clicks === 1) {
      onDoubleClick();
      setClicks(0);
    }

    setTimeout(() => {
      if (clicks === 0) setClicks(0);
    }, 300);
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onDoubleClick();
    }
  };

  return (
    <button
      className={`desktop-icon flex flex-col items-center gap-1 p-2 sm:p-3 rounded w-20 sm:w-24 ${
        isSelected ? "selected" : ""
      }`}
      onClick={handleClick}
      onBlur={() => setIsSelected(false)}
      onKeyUp={handleKeyUp}
      role="button"
      aria-label={label}
    >
      <img src={processedSrc} alt={label} className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg" />
      <span className="text-white text-[11px] sm:text-xs text-center drop-shadow-md font-medium">
        {label}
      </span>
    </button>
  );
};

export default DesktopIcon;
