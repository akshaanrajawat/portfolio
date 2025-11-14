import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const Window = ({ id, title, children, onClose, onMinimize, onFocus, zIndex }: WindowProps) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Responsive initial size and centering
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth > 640 && window.innerWidth <= 1024;
    const desiredWidth = isMobile ? Math.round(window.innerWidth * 0.92) : isTablet ? Math.min(820, Math.round(window.innerWidth * 0.85)) : 800;
    const desiredHeight = isMobile ? Math.round(window.innerHeight * 0.7) : isTablet ? Math.min(700, Math.round(window.innerHeight * 0.75)) : 600;
    setSize({ width: desiredWidth, height: desiredHeight });
    const centerX = Math.max(0, (window.innerWidth - desiredWidth) / 2);
    const centerY = Math.max(0, (window.innerHeight - desiredHeight - 48) / 2);
    setPosition({ x: centerX, y: centerY });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-titlebar")) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      onFocus();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    const target = e.target as HTMLElement;
    if (target === e.currentTarget || target.closest(".window-titlebar")) {
      setIsDragging(true);
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      onFocus();
    }
  };

  const clampWithinViewport = (nextX: number, nextY: number) => {
    const maxX = Math.max(0, window.innerWidth - size.width);
    const taskbarHeight = 48;
    const bottomPadding = 32; // keep a little margin
    const maxY = Math.max(0, window.innerHeight - taskbarHeight - bottomPadding);
    return {
      x: Math.max(0, Math.min(nextX, maxX)),
      y: Math.max(0, Math.min(nextY, maxY)),
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const next = clampWithinViewport(e.clientX - dragStart.x, e.clientY - dragStart.y);
      setPosition(next);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      if (!touch) return;
      const next = clampWithinViewport(touch.clientX - dragStart.x, touch.clientY - dragStart.y);
      setPosition(next);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleTouchMove as any);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position, size]);

  return (
    <div
      ref={windowRef}
      className="absolute win7-glass rounded-lg overflow-hidden window-open"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onMouseDown={() => onFocus()}
      onTouchStart={handleTouchStart}
    >
      {/* Title Bar */}
      <div
        className="window-titlebar h-8 flex items-center justify-between px-2 cursor-move"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="text-white text-sm font-medium select-none">{title}</span>
        <div className="flex items-center gap-1">
          <button
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={onMinimize}
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/20 transition-colors">
            <Square className="w-3 h-3 text-white" />
          </button>
          <button
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-500 transition-colors"
            onClick={onClose}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] bg-white overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
