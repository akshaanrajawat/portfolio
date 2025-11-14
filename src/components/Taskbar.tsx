import { useState, useEffect } from "react";
import { Battery, Volume2, Wifi } from "lucide-react";
import windowsLogo from "@/assets/icons/windows-logo.png";

interface TaskbarProps {
  openWindows: Array<{ id: string; type: string; title: string; isMinimized: boolean }>;
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  isStartMenuOpen: boolean;
}

const Taskbar = ({ openWindows, onStartClick, onWindowClick, isStartMenuOpen }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 taskbar-glass flex items-center justify-between px-2 z-[9000] pb-[max(env(safe-area-inset-bottom),0px)]">
      {/* Start Button */}
      <button
        className={`start-button h-10 w-14 rounded-lg flex items-center justify-center transition-all ${
          isStartMenuOpen ? "opacity-90 shadow-inner" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onStartClick();
        }}
      >
        <img src={windowsLogo} alt="Windows" className="w-7 h-7" />
      </button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 mx-2 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`h-8 sm:h-9 px-3 sm:px-4 rounded flex items-center gap-2 transition-all ${
              window.isMinimized
                ? "bg-white/10 hover:bg-white/20"
                : "bg-white/20 hover:bg-white/30"
            }`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="text-white text-xs sm:text-sm truncate max-w-[110px] sm:max-w-[150px]">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-white/80">
          <Volume2 className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>
        <div className="h-9 px-3 flex flex-col items-end justify-center text-white text-[10px] sm:text-xs border-l border-white/20 ml-2">
          <div className="font-medium leading-none">{formatTime(time)}</div>
          <div className="text-white/80 leading-none">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
