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
    // Center window on screen
    const centerX = (window.innerWidth - size.width) / 2;
    const centerY = (window.innerHeight - size.height - 48) / 2; // 48px for taskbar
    setPosition({ x: Math.max(0, centerX), y: Math.max(0, centerY) });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest(".window-titlebar")) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      onFocus();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(e.clientX - dragStart.x, window.innerWidth - size.width));
      const newY = Math.max(0, Math.min(e.clientY - dragStart.y, window.innerHeight - 48 - 32));
      setPosition({ x: newX, y: newY });
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
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

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
    >
      {/* Title Bar */}
      <div
        className="window-titlebar h-8 flex items-center justify-between px-2 cursor-move"
        onMouseDown={handleMouseDown}
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
