import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Terminal, Moon, Sun, ChevronDown, Mail, Phone, MapPin, FileText } from 'lucide-react'
import { siGithub, siGmail, siLinkedin, SimpleIcon, siSitecore} from 'simple-icons';
import { motion, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { ColorTheme, ThemeProperties, themes } from './visual-models/Themes';
import { colors } from './visual-models/Colors';
import { colorThemes } from './visual-models/ColorThemes';
import projects from './data/projects.json';
import careers from './data/careers.json';
import skills from './data/skills.json';
import aboutMe from './data/about.json';
import achievements from './data/achievements.json';
import { marked } from 'marked';

type SocialData = {
  icon: SimpleIcon
  label: string
  href: string,
  extraClass?: string
}
const socialData : SocialData[] = [
  { icon: siGithub, label: 'https://github.com/alejandrobolano', href: 'https://github.com/alejandrobolano' },
  { icon: siLinkedin, label: 'https://www.linkedin.com/in/alejandro-bolano/', href: 'https://www.linkedin.com/in/alejandro-bolano/' },
  { icon: siSitecore, label: 'https://alejandrobolano.web.app', href: 'https://alejandrobolano.web.app', extraClass: 'line-through'},
];

const socialDataLabel: SocialData[] = [
  { icon: siGithub, label: 'GitHub' , href: 'https://github.com/alejandrobolano/Portfolio'},
  { icon: siLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/alejandro-bolano/' },
  { icon: siGmail, label: 'Email', href: 'mailto:alejandro.bolano.336@gmail.com' }
]

const contacts = [
  {
    icon: Mail,
    label: "alejandro.bolano.336@gmail.com",
    href: "mailto:alejandro.bolano.336@gmail.com",
  },
  {
    icon: Phone,
    label: "+34 604373923",
    href: "tel:+34604373923",
  },
  {
    icon: MapPin,
    label: "Barcelona, Spain",
    href: "https://maps.app.goo.gl/SAWgjBb7N2wYye6j7",
  },
]

const navigation: string[] = ['home', 'about', 'projects', 'career', 'contact']
type windowStyle = 'modern' | 'retro' | 'minimal' | 'glass' | 'neon' | 'matrix' | 'cyberpunk' | 'gradient' | 'vaporwave'
const windowStyles: windowStyle[] = [
  'modern',
  'retro',
  'minimal',
  'glass',
  'neon',
  'matrix',
  'cyberpunk',
  'gradient',
  'vaporwave'
];

const randomColors500 = ["blue", "green", "purple"];
const cvView = "https://drive.google.com/file/d/1ZrA5K017qO8h1yPeM0n7HePGNsGFs5P3/view?usp=sharing";
const cvDownload = "https://drive.google.com/uc?export=download&id=1ZrA5K017qO8h1yPeM0n7HePGNsGFs5P3";


export default function EnhancedPortfolio() {
  const defaultWindow = 'modern'
  const [activeWindow, setActiveWindow] = useState('about')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [terminalStyle, setTerminalStyle] = useState<WindowProps['style']>(defaultWindow)
  const [colorTheme, setColorTheme] = useState<ColorTheme>('green')
  const [isThemeControlsOpen, setIsThemeControlsOpen] = useState(false)
  

  useEffect(() => {
    // Handle scroll to update active window
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'career', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveWindow(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  
  interface WindowProps {
    title: string
    children: React.ReactNode
    isActive?: boolean
    style?: windowStyle
  }

  const Window = ({ title, children, isActive = false, style = terminalStyle }: WindowProps) => {
    const currentStyle : ThemeProperties = style === undefined ? themes[defaultWindow] : themes[style]

    return (
      <motion.div
        {...currentStyle.animation}
        className={`${currentStyle.window} 
        ${currentStyle === themes.modern ? `border-${colorTheme}-500/20` : ""} 
        overflow-hidden 
        ${isActive ? "ring-1 ring-green-500/20" : ""}`}
      >
        <div
          className={`flex items-center justify-between ${currentStyle.header} 
          ${currentStyle === themes.modern ? `border-${colorTheme}-500/20` : ""}  `}
        >
          <span className={`currentStyle.title 
            ${currentStyle === themes.modern ? `text-${colorTheme}-400` : ''} `}>{title}</span>
          <div className={currentStyle.buttons}>
            {style !== "minimal" && (
              <>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(
                    style!,
                    "close"
                  )}`}
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(
                    style!,
                    "minimize"
                  )}`}
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`${currentStyle.button} ${getButtonColor(
                    style!,
                    "maximize"
                  )}`}
                />
              </>
            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={style}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={currentStyle.content}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }

  const getButtonColor = (style: string, type: 'close' | 'minimize' | 'maximize') => {
    return colors[style]?.[type] || colors.modern[type]
  }
  
  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * randomColors500.length);
    return randomColors500[randomIndex];
  }

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = activeWindow === href.replace('#', '')
    
    return (
      <motion.a
        href={href}
        className={`relative text-sm uppercase tracking-wider transition-colors
          ${isActive ? `text-${colorTheme}-400` : `text-zinc-400 hover:text-${colorTheme}-500`}`}
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          setIsMenuOpen(false)
        }}
      >
        {children}
        {isActive && (
          <motion.div
            layoutId="activeSection"
            className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-${colorTheme}-500`}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </motion.a>
    )
  }

  const Navigation = () => {
    return (
      <nav aria-label="Main navigation">
        <div className="flex justify-between items-center">
          <Terminal className="text-green-500 w-8 h-8" />
          <button
            className={`md:hidden text-zinc-400 hover:text-${colorTheme}-500 transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <ChevronDown className={`w-6 h-6 transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          <ul className={`md:flex items-center gap-4 text-zinc-400 ${isMenuOpen ? 'block absolute top-full left-0 right-0 bg-black/80 p-4 md:p-0 md:relative md:bg-transparent' : 'hidden'}`}>
            {navigation.map((item) => (
              <li key={item}>
                <NavLink href={`#${item}`}>
                  {item === 'career' ? 'Career Journey' : item}
                </NavLink>
              </li>
            ))}
            <li className="md:ml-4">
              <motion.button
                    onClick={() => onCustomLinkClick(cvView)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    whileDrag={{ scale: 0.9, rotate: 10 }}
                    className={`inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-${colorTheme}-400 
    text-${colorTheme}-400 font-bold hover:bg-${colorTheme}-400/10 transition-colors duration-300 cursor-pointer`}
                  >
                    <FileText className="w-5 h-5" />
                    Curriculum PDF
                  </motion.button>
            </li>
            <li>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`text-zinc-400 hover:text-${colorTheme}-500 transition-colors`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }

  const ThemeControls = () => {   

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-4 z-50"
      >
        <motion.div
          initial={false}
          animate={{ height: isThemeControlsOpen ? 'auto' : '48px' }}
          className={`bg-black/90 backdrop-blur-md rounded-lg border border-${colorTheme}-500/20 
            shadow-lg shadow-${colorTheme}-500/10 overflow-hidden
            transition-colors duration-300`}
        >
          <button
            onClick={() => setIsThemeControlsOpen(!isThemeControlsOpen)}
            className={`w-full px-4 py-2 flex items-center justify-between 
              text-${colorTheme}-400 hover:text-${colorTheme}-300 
              transition-all duration-300`}
          >
            <span className="text-sm font-mono flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${colorTheme}-500 animate-pulse`} />
              Theme Controls
            </span>
            <motion.div
              animate={{ rotate: isThemeControlsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isThemeControlsOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-4 border-t border-${colorTheme}-500/20`}
              >
                <div className="space-y-4">
                  <h3 className={`text-sm font-mono text-${colorTheme}-400`}>Color Theme</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(colorThemes).map(([theme, colors]) => (
                      <motion.button
                        key={theme}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setColorTheme(theme as ColorTheme)}
                        className={`w-8 h-8 rounded-full relative 
                          ${colorTheme === theme 
                            ? `ring-2 ring-${theme}-400 ring-offset-2 ring-offset-black` 
                            : ''}`}
                        style={{
                          background: colors.primary,
                          boxShadow: `0 0 20px ${colors.primary}40`
                        }}
                      >
                        {colorTheme === theme && (
                          <motion.div
                            layoutId="selectedColor"
                            className={`absolute inset-0 rounded-full border-2 border-${theme}-400`}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className={`text-sm font-mono text-${colorTheme}-400`}>Terminal Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {windowStyles.map((style) => (
                      <motion.button
                        key={style}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setTerminalStyle(style as WindowProps['style'])}
                        className={`px-3 py-2 rounded-md text-xs font-mono transition-all duration-300
                          ${terminalStyle === style 
                            ? `bg-${colorTheme}-500 text-black font-medium shadow-md shadow-${colorTheme}-500/20` 
                            : `text-${colorTheme}-400 hover:text-${colorTheme}-300 bg-black/50 hover:bg-black/70`}`}
                      >
                        {style}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    )
  }

  const getThemeColor = (opacity = 1) => {
    const colors = {
      green: `rgba(34, 197, 94, ${opacity})`,
      blue: `rgba(59, 130, 246, ${opacity})`,
      purple: `rgba(168, 85, 247, ${opacity})`,
      red: `rgba(239, 68, 68, ${opacity})`,
      orange: `rgba(249, 115, 22, ${opacity})`,
      pink: `rgba(236, 72, 153, ${opacity})`,
      cyan: `rgba(34, 211, 238, ${opacity})`
    }
    return colors[colorTheme]
  }

  const onCustomClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  const onCustomLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const containerRef = useRef(null);

  return (
    <div
      className="min-h-screen transition-all duration-500 font-mono"
      style={{
        background: isDarkMode
          ? `linear-gradient(to bottom right, rgb(0, 0, 0), rgba(0, 0, 0, 0.9), ${getThemeColor(
              0.1
            )})`
          : `linear-gradient(to bottom right, rgb(255, 255, 255), rgb(243, 244, 246), ${getThemeColor(
              0.1
            )})`,
      }}
    >
      {isLoading ? (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          onAnimationComplete={() => setIsLoading(false)}
        >
          <Terminal className="text-green-500 w-12 h-12 animate-pulse" />
        </motion.div>
      ) : (
        <>
          <ThemeControls />
          <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
            <nav className="container mx-auto px-6 py-4 m:px-6 md:max-lg md:px-4 lg:px-8">
              <Navigation />
            </nav>
          </header>

          <main className="container mx-auto px-4 sm:px-2 md:px-0 sm:py-4 md:py-6 py-20">
            <section
              id="home"
              ref={containerRef}
              className="min-h-screen flex items-center justify-center py-20 relative"
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-purple-500/5" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10 px-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="flex justify-center items-center mb-4"
                >
                  <img
                    src="/image/profile-pic-logo.png"
                    alt="Alejandro Bolaño"
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <span
                    className={`text-lg ${
                      isDarkMode ? "text-zinc-400" : "text-gray-600"
                    }`}
                  >
                    👋 Welcome to my portfolio
                  </span>
                </motion.div>

                <h1
                  className={`text-5xl md:text-7xl font-bold mb-6 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className={`text-${colorTheme}-400`}>&lt;/</span>Hi, <span className={`text-${colorTheme}-400`}>I'm</span>{" "}
                  <span className="relative">
                    Alejandro Bolaño
                    <motion.span
                      className={`absolute -bottom-2 left-0 w-full h-1 bg-${colorTheme}-500`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </span><span className={`text-${colorTheme}-400`}>&gt;</span>
                </h1>
                <br />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xl max-w-2xl mx-auto mb-8 ${
                    isDarkMode ? "text-zinc-400" : "text-gray-600"
                  }`}
                >
                  I'm a Software Engineer specializing in{" "}
                  <span
                    className={`text-${colorTheme}-400 ${colorTheme} font-semibold`}
                  >
                    full-stack development
                  </span>{" "}
                  with desires for{" "}
                  <span className={`text-${colorTheme}-400 font-semibold`}>
                    personal and professional improvement.
                  </span>{" "}
                  〽 I like daily challenges because I can gain new experiences,
                  trying to challenge myself every day to be better. I love{" "}
                  <span className={`text-${colorTheme}-400 font-semibold`}>
                    doing manager team and lead it
                  </span>
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-center mb-6"
                >
                  <p className="text-sm text-gray-500">
                    If you don't like the position of the buttons, move them! 😉
                    Just make sure to double-click to get what you want.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap items-center justify-center gap-4"
                >
                  <motion.button
                    onDoubleClick={() => onCustomClick("contact")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    whileDrag={{ scale: 0.9, rotate: 10 }}
                    dragConstraints={containerRef}
                    drag
                    className={`inline-flex items-center gap-2 bg-${colorTheme}-400 text-black font-bold py-3 px-6 rounded-full 
    hover:bg-${colorTheme}-400 transition-colors`}
                  >
                    <Mail className="w-5 h-5" />
                    Get in touch
                  </motion.button>
                  <motion.button
                    onDoubleClick={() => onCustomLinkClick(cvDownload)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    whileDrag={{ scale: 0.9, rotate: 10 }}
                    dragConstraints={containerRef}
                    drag
                    className={`inline-flex items-center gap-2 py-3 px-6 rounded-full border-2 border-${colorTheme}-400 
    text-${colorTheme}-400 font-bold hover:bg-${colorTheme}-400/10 transition-colors duration-300 cursor-pointer`}
                  >
                    <FileText className="w-5 h-5" />
                    Download CV
                  </motion.button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 flex justify-center gap-6"
                >
                  {socialDataLabel.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`text-zinc-400 hover:text-green-500 transition-colors duration-300`}
                      aria-label={social.label}
                    >
                      <motion.svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={colorTheme}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        dangerouslySetInnerHTML={{ __html: social.icon.svg }}
                      />
                    </motion.a>
                  ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-zinc-400" : "text-gray-600"
                      }`}
                    >
                      Scroll to explore
                    </span>
                    <ChevronDown className="w-5 h-5 text-green-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>

            <section id="about" className="py-20">
              <h2
                className={`text-3xl font-bold mb-8 text-center ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <span className={`text-${colorTheme}-400`}>&lt;/</span>About Me<span className={`text-${colorTheme}-400`}>&gt;</span>
              </h2>
              <div className="grid md:grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2">
                <Window title="about.json" isActive>
                  <div className="font-mono space-y-4 text-zinc-300">
                    <div className="typing-effect">
                      {aboutMe.map((info) => {
                        const markdownContent = marked(info.text);
                        return (
                          <div
                            key={info.id}
                            className="flex gap-4 items-center hover:bg-zinc-800/50 p-2 rounded transition-colors"
                          >
                            <span className="text-zinc-600 select-none">
                              {info.id}
                            </span>
                            <span
                              className="text-zinc-300"
                              dangerouslySetInnerHTML={{
                                __html: markdownContent,
                              }}
                            ></span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Window>

                <div className="space-y-6">
                  <Window title="skills.json">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-green-500 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>{" "}
                          Languages & Frameworks
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.languagesAndFrameworks.map((skill) => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-blue-400 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>{" "}
                          Tools
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.tools.map((skill) => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-yellow-500 mb-4 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>{" "}
                          Other skills
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {skills.other.map((skill) => (
                            <motion.span
                              key={skill}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1.5 bg-zinc-800/70 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700/70 transition-colors cursor-default"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Window>

                  <Window title="achievements.json">
                    <div className="space-y-4">
                      {achievements.map((achievement) => {
                        const color = getRandomColor();
                        return (
                          <motion.div
                            key={achievement.id}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-3 p-2 hover:bg-zinc-800/50 rounded-lg transition-colors"
                          >
                            <span className="text-xl">{achievement.icon}</span>
                            <span className={`text-${color}-400 font-medium`}>
                              {achievement.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Window>
                </div>
              </div>
            </section>

            <section id="projects" className="py-20">
              <h2
                className={`text-3xl font-bold mb-8 text-center ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <span className={`text-${colorTheme}-400`}>&lt;/</span>Projects<span className={`text-${colorTheme}-400`}>&gt;</span>                
              </h2>
              <Window title="projects.json" isActive>
                <div className="space-y-8">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      className="group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-600 font-mono">
                            {project.id}
                          </span>
                          <h3
                            className={`text-2xl font-bold group-hover:text-green-500 transition-colors ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {project.title}
                          </h3>
                          <span className="text-zinc-600 font-mono">
                            <a href={project?.link} target="blanck">
                              {project?.company}
                            </a>
                          </span>
                        </div>
                        <span className="text-zinc-600">{project.year}</span>
                      </div>
                      <p
                        className={`mb-4 ${
                          isDarkMode ? "text-zinc-400" : "text-gray-600"
                        }`}
                      >
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full bg-zinc-800/50 text-xs text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Window>
            </section>

            <section id="career" className="py-20">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className={`text-3xl font-bold text-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  <span className={`text-${colorTheme}-400`}>&lt;/</span>Career Journey<span className={`text-${colorTheme}-400`}>&gt;</span>
                  
                </h2>
                <motion.a
                  href={cvView}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg text-green-500 
                    hover:bg-zinc-700 transition-colors duration-300 border border-green-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-mono text-sm">
                    CV Alejandro Bolaño.pdf
                  </span>
                </motion.a>
              </div>
              <Window title="careers.json" isActive={activeWindow === "career"}>
                <div className="space-y-12">
                  {careers.map((career) => {
                    const color = getRandomColor();
                    return (
                      <motion.div
                        key={career.id}
                        className={`relative pl-8 border-l-2 border-${color}-500/20`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="absolute -left-[9px] top-0">
                          <div
                            className={`w-4 h-4 rounded-full bg-${color}-500`}
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3
                              className={`text-xl font-bold ${
                                isDarkMode ? "text-white" : "text-black"
                              }`}
                            >
                              {career.title}
                            </h3>
                            <span
                              className={`text-${color}-500 font-mono text-sm`}
                            >
                              {career.year}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold ${
                                isDarkMode ? "text-zinc-300" : "text-gray-700"
                              }`}
                            >
                              {career.school}
                            </span>

                            <span className="text-zinc-500">•</span>
                            <span className="text-zinc-500">{career.city}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Window>
            </section>

            <section id="contact" className="py-20">
              <h2
                className={`text-3xl font-bold mb-8 text-center ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <span className={`text-${colorTheme}-400`}>&lt;/</span>Contact<span className={`text-${colorTheme}-400`}>&gt;</span>
                
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Window title="me-online.sh">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <motion.div
                          key={contact.label}
                          whileHover={contact.href ? { x: 4 } : {}}
                          className={`group flex items-center gap-4 p-2 rounded-md ${
                            contact.href ? "hover:bg-zinc-800/50" : ""
                          } transition-colors`}
                        >
                          <contact.icon
                            className={`text-zinc-400 ${
                              contact.href ? "group-hover:text-green-500" : ""
                            } transition-colors`}
                          />
                          {contact.href ? (
                            <a
                              href={contact.href}
                              target="_blank"
                              className="text-zinc-300 group-hover:text-green-500 transition-colors"
                            >
                              {contact.label}
                            </a>
                          ) : (
                            <span className="text-zinc-300">
                              {contact.label}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-800">
                      <div className="space-y-4">
                        {socialData.map((social) => (
                          <motion.div
                            key={social.label}
                            whileHover={{ x: 4 }}
                            className={`group flex items-center gap-4 p-2 rounded-md hover:bg-zinc-800/50 transition-colors ${social?.extraClass}`}
                          >
                            <motion.svg
                              className={`w-6 h-6 group-hover:text-${colorTheme}-400 transition-colors`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={colorTheme}
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.3 }}
                              dangerouslySetInnerHTML={{
                                __html: social.icon.svg,
                              }}
                            />
                            <a
                              href={social.href}
                              target="_blank"
                              className={`text-zinc-300 group-hover:text-${colorTheme}-300 transition-colors`}
                            >
                              {social.label}
                            </a>
                            <ArrowUpRight
                              className={`text-zinc-600 w-4 h-4 group-hover:text-${colorTheme}-400 transition-colors ml-auto`}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800">
                      <motion.div
                        className="flex items-center gap-3 p-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="relative">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                        </div>
                        <span className="text-zinc-300">
                          Available for new opportunities
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Window>
              </div>
            </section>
          </main>

          <footer className="bg-black/80 backdrop-blur-sm py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-zinc-400 text-sm sm:text-base md:text-lg">
                Copyright &copy; 2024 Alejandro Bolaño. All rights reserved.
              </p>
            </div>
          </footer>
          <Analytics />
        </>
      )}
    </div>
  );
}