import { User, Folder, FileText, Power, Search } from "lucide-react";
import { WindowType } from "./Desktop";

interface StartMenuProps {
  onClose: () => void;
  onOpenWindow: (type: WindowType, title?: string) => void;
  onShutdown: () => void;
}

const StartMenu = ({ onClose, onOpenWindow, onShutdown }: StartMenuProps) => {
  const handleItemClick = (type: WindowType, title?: string) => {
    onOpenWindow(type, title);
    onClose();
  };

  return (
    <div
      className="absolute bottom-12 left-0 w-[520px] h-[550px] rounded-tr-lg overflow-hidden z-[9001] animate-scale-in shadow-2xl border border-white/30"
      style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(245,248,252,0.98) 100%)"
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-full">
        {/* Left Column */}
        <div className="w-[60%] bg-transparent p-3 flex flex-col border-r border-gray-200/50">
          <div className="flex-1 space-y-0.5">
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all text-left group"
              onClick={() => handleItemClick("about", "About Me")}
            >
              <User className="w-5 h-5 text-gray-700 group-hover:text-primary" />
              <span className="text-sm font-normal text-gray-800 group-hover:text-gray-900">About Me</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all text-left group"
              onClick={() => handleItemClick("projects", "Projects")}
            >
              <Folder className="w-5 h-5 text-gray-700 group-hover:text-primary" />
              <span className="text-sm font-normal text-gray-800 group-hover:text-gray-900">Projects</span>
            </button>
            <button
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all text-left group"
              onClick={() => handleItemClick("resume", "Resume")}
            >
              <FileText className="w-5 h-5 text-gray-700 group-hover:text-primary" />
              <span className="text-sm font-normal text-gray-800 group-hover:text-gray-900">Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[40%] bg-gradient-to-b from-[#dcebf5] to-[#c4dded] p-3 flex flex-col">
          <div className="flex-1 space-y-1">
            <div className="px-3 py-1.5 text-xs font-semibold text-gray-700">Quick Access</div>
            <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/40 transition-colors text-left text-sm group">
              <Folder className="w-4 h-4 text-gray-700 group-hover:text-primary" />
              <span className="text-gray-800 text-xs">Documents</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/40 transition-colors text-left text-sm group">
              <Folder className="w-4 h-4 text-gray-700 group-hover:text-primary" />
              <span className="text-gray-800 text-xs">Pictures</span>
            </button>
            <button
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/40 transition-colors text-left text-sm group"
              onClick={() => handleItemClick("mail", "Contact")}
            >
              <Folder className="w-4 h-4 text-gray-700 group-hover:text-primary" />
              <span className="text-gray-800 text-xs">Contact</span>
            </button>
          </div>

          {/* Bottom Section */}
          <div className="space-y-2 border-t border-gray-300/50 pt-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded border border-gray-300/30">
              <Search className="w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search programs and files"
                className="bg-transparent border-none outline-none text-xs text-gray-800 placeholder-gray-500 flex-1"
              />
            </div>
            <button
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-orange-100 transition-colors text-left border border-transparent hover:border-orange-300"
              onClick={onShutdown}
            >
              <span className="text-sm font-normal text-gray-800">Shut down</span>
              <Power className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
