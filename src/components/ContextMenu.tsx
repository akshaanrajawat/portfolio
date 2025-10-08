import { RefreshCw, Image, Settings } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

const ContextMenu = ({ x, y, onClose }: ContextMenuProps) => {
  return (
    <div
      className="absolute win7-glass rounded shadow-lg py-1 z-[9999] min-w-[200px] animate-scale-in"
      style={{ left: `${x}px`, top: `${y}px` }}
      onClick={(e) => e.stopPropagation()}
    >
      <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center gap-3">
        <RefreshCw className="w-4 h-4" />
        <span>Refresh</span>
      </button>
      <div className="h-px bg-border my-1" />
      <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center gap-3">
        <Image className="w-4 h-4" />
        <span>Change Background</span>
      </button>
      <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center gap-3">
        <Settings className="w-4 h-4" />
        <span>Properties</span>
      </button>
    </div>
  );
};

export default ContextMenu;
