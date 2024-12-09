
export type ColorTheme = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'pink' | 'cyan';

export type ThemeProperties = {
    window: string | ((colorTheme: ColorTheme) => string);
    header: string | ((colorTheme: ColorTheme) => string);
    buttons: string;
    button: string;
    title: string | ((colorTheme: ColorTheme) => string);
    content: string;
    animation: {
      initial: { [key: string]: number | string };
      animate: { [key: string]: number | string };
      transition: { [key: string]: number | string };
    };
  };
  
  export type Themes = {
    modern: ThemeProperties;
    retro: ThemeProperties;
    minimal: ThemeProperties;
    glass: ThemeProperties;
    neon: ThemeProperties;
    matrix: ThemeProperties;
    cyberpunk: ThemeProperties;
    gradient: ThemeProperties;
    vaporwave: ThemeProperties;
  };

  
export const themes: Themes = {
    modern: {
      window: "bg-black/80 backdrop-blur-sm rounded-lg border",
      header: "px-4 py-2 border-b",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full",
      title: "text-sm font-mono",
      content: "p-4",
      animation: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
    },
    retro: {
      window: "bg-zinc-900 rounded border-2 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
      header: "px-4 py-2 border-b-2 border-green-500/50 bg-zinc-800",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded",
      title: "text-sm text-green-500 font-mono uppercase tracking-wider",
      content: "p-4 text-green-500",
      animation: {
        initial: { scale: 0.95, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: "spring", stiffness: 300, damping: 20 },
      },
    },
    minimal: {
      window: "bg-zinc-900/50 rounded-sm border border-zinc-800",
      header: "px-3 py-1.5 border-b border-zinc-800",
      buttons: "hidden",
      button: "",
      title: "text-xs text-zinc-500 font-mono",
      content: "p-3",
      animation: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 },
      },
    },
    glass: {
      window: "bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg",
      header: "px-4 py-2 border-b border-white/20",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full bg-white/20",
      title: "text-sm text-white/70 font-mono",
      content: "p-4",
      animation: {
        initial: { opacity: 0, backdropFilter: "blur(0px)" },
        animate: { opacity: 1, backdropFilter: "blur(12px)" },
        transition: { duration: 0.7 },
      },
    },
    neon: {
      window: "bg-black/90 rounded-lg border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      header: "px-4 py-2 border-b-2 border-purple-500/50 bg-black/50",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full animate-pulse",
      title: "text-sm text-purple-400 font-mono uppercase tracking-widest",
      content: "p-4 text-purple-300",
      animation: {
        initial: { opacity: 0, scale: 0.98 },
        animate: { opacity: 1, scale: 1 },
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 5,
        },
      },
    },
    matrix: {
      window: "bg-black rounded-lg border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)] overflow-hidden",
      header: "px-4 py-2 border-b border-green-500/30 bg-black/90",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full bg-green-500/50",
      title: "text-sm text-green-400 font-mono glitch",
      content: "p-4 text-green-400 matrix-bg",
      animation: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { type: "spring", stiffness: 200 },
      },
    },
    cyberpunk: {
      window: "bg-black/80 rounded-lg border-l-4 border-r-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
      header: "px-4 py-2 border-b-2 border-yellow-500/50 bg-yellow-500/10",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded cyberpunk-glow",
      title: "text-sm text-yellow-500 font-mono uppercase tracking-widest",
      content: "p-4 text-yellow-100",
      animation: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { type: "spring", stiffness: 200 },
      },
    },
    gradient: {
      window: "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 backdrop-blur-md rounded-lg border border-white/10",
      header: "px-4 py-2 border-b border-white/10 bg-white/5",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full gradient-glow",
      title: "text-sm text-white/80 font-mono",
      content: "p-4 text-white/90",
      animation: {
        initial: { opacity: 0, rotate: -2 },
        animate: { opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 200 },
      },
    },
    vaporwave: {
      window: "bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-lg border-2 border-pink-400/30",
      header: "px-4 py-2 border-b-2 border-pink-400/30 bg-gradient-to-r from-pink-500/10 to-purple-500/10",
      buttons: "flex gap-2",
      button: "w-3 h-3 rounded-full shadow-lg shadow-pink-500/50",
      title: "text-sm text-pink-300 font-mono tracking-widest",
      content: "p-4 text-pink-200",
      animation: {
        initial: { opacity: 0, rotate: -2 },
        animate: { opacity: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 200 },
      },
    }
  };
  