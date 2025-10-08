import { useEffect, useMemo, useRef, useState } from "react";

const ResumeWindow = () => {
  const candidates = ["resume.png", "resume.jpg", "resume.jpeg", "resume.webp"];
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const cacheBust = useRef<string>(`v=${Date.now()}`);

  useEffect(() => {
    let isMounted = true;
    const tryLoadSequentially = async () => {
      for (const name of candidates) {
        const url = new URL(`${import.meta.env.BASE_URL}${name}`, window.location.origin).toString();
        try {
          // Head request isn't reliable for static servers; attempt image load
          await new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("not found"));
            img.src = `${url}?v=${Date.now()}`; // cache-bust
          });
          if (!isMounted) return;
          setImageSrc(url);
          setError(null);
          return;
        } catch (_) {
          // try next
        }
      }
      if (!isMounted) return;
      setError("No resume image found. Place resume.png/jpg/jpeg/webp in public.");
    };
    tryLoadSequentially();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex-none p-2 border-b bg-gray-50 text-sm text-gray-700 flex items-center justify-between">
        <span>Resume preview (image)</span>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.1).toFixed(2)))}
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="px-2 text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
          <button
            className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={() => setZoom((z) => Math.min(4, +(z + 0.1).toFixed(2)))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            className="ml-2 px-2 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={() => setZoom(1)}
          >
            100%
          </button>
          <button
            className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
            onClick={() => setZoom(1.25)}
          >
            Fit
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {imageSrc ? (
          <div
            className="inline-block"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <img
              src={`${imageSrc}?${cacheBust.current}`}
              alt="Resume"
              className="block"
              draggable={false}
            />
          </div>
        ) : (
          <div className="p-4 text-sm text-gray-600">
            {error ?? "Loading resume..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeWindow;


