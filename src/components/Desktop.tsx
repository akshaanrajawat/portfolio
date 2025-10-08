import { useState, useRef } from "react";
import { Globe } from "lucide-react";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import MailWindow from "./windows/MailWindow";
import BlogWindow from "./windows/BlogWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import AboutWindow from "./windows/AboutWindow";
import ResumeWindow from "./windows/ResumeWindow";
import GithubWindow from "./windows/GithubWindow";
import ContextMenu from "./ContextMenu";
import wallpaper from "@/assets/windows7-wallpaper.jpg";
import mailIcon from "@/assets/icons/mail-icon.png";
import notepadIcon from "@/assets/icons/notepad-icon.png";
// Internet Explorer icon (lightweight inline SVG data URL)
const ieIconDataUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#7ec8ff"/>
          <stop offset="100%" stop-color="#2167b1"/>
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="20" fill="url(#g)" stroke="#0b3f7a" stroke-width="2"/>
      <path d="M18 34h20c0 6-5 11-11 11s-11-5-11-11z" fill="#fff" opacity=".2"/>
      <path d="M25 22h14v6H31v4h8v6H25V22z" fill="#ffffff"/>
      <ellipse cx="32" cy="32" rx="28" ry="12" fill="none" stroke="#7db3e6" stroke-width="3" opacity=".8"/>
    </svg>`
  );
import folderIcon from "@/assets/icons/folder-icon.png";
import fileIcon from "@/assets/icons/notepad-icon.png";

export type WindowType = "mail" | "blog" | "chrome" | "projects" | "about" | "resume";

interface OpenWindow {
  id: string;
  type: WindowType;
  title: string;
  isMinimized: boolean;
  zIndex: number;
}

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(100);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  const desktopIcons = [
    { id: "mail", iconSrc: mailIcon, label: "Mail", type: "mail" as WindowType },
    { id: "blog", iconSrc: notepadIcon, label: "Blog", type: "blog" as WindowType },
    { id: "chrome", iconSrc: ieIconDataUrl, label: "Internet Explorer", type: "chrome" as WindowType },
    { id: "projects", iconSrc: folderIcon, label: "Projects", type: "projects" as WindowType },
    { id: "resume", iconSrc: fileIcon, label: "Resume", type: "resume" as WindowType },
  ];

  const openWindow = (type: WindowType, title?: string) => {
    const existingWindow = openWindows.find((w) => w.type === type);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        setOpenWindows((windows) =>
          windows.map((w) =>
            w.id === existingWindow.id ? { ...w, isMinimized: false } : w
          )
        );
      }
      return;
    }

    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      isMinimized: false,
      zIndex: maxZIndex + 1,
    };
    setOpenWindows([...openWindows, newWindow]);
    setMaxZIndex(maxZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows((windows) => windows.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows((windows) =>
      windows.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const focusWindow = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setOpenWindows((windows) =>
      windows.map((w) => (w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w))
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleShutdown = () => {
    setIsShuttingDown(true);
  };

  if (isShuttingDown) {
    return (
      <div className="fixed inset-0 bg-primary flex items-center justify-center z-[9999]">
        <div className="text-center text-primary-foreground animate-fade-in">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-white/30 border-t-white animate-spin" />
          <h1 className="text-3xl font-light">Shutting down...</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: "cover", backgroundPosition: "center" }}
      onClick={() => {
        setContextMenu(null);
        setIsStartMenuOpen(false);
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            iconSrc={icon.iconSrc}
            label={icon.label}
            onDoubleClick={() => openWindow(icon.type, icon.label)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window) => {
        if (window.isMinimized) return null;

        let content;
        switch (window.type) {
          case "mail":
            content = <MailWindow />;
            break;
          case "blog":
            content = <BlogWindow />;
            break;
          case "resume":
            content = <ResumeWindow />;
            break;
          case "chrome":
            content = <GithubWindow />;
            break;
          case "projects":
            content = <ProjectsWindow />;
            break;
          case "about":
            content = <AboutWindow />;
            break;
        }

        return (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={window.zIndex}
          >
            {content}
          </Window>
        );
      })}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Start Menu */}
      {isStartMenuOpen && (
        <StartMenu
          onClose={() => setIsStartMenuOpen(false)}
          onOpenWindow={openWindow}
          onShutdown={handleShutdown}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        onWindowClick={(id) => focusWindow(id)}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
};

export default Desktop;
