import { useState, useEffect } from "react";
import "./App.css";
import avatarImage from "../public/avatar.png";
import wechatQR from "../public/wechat.jpg";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaWeixin } from "react-icons/fa";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { Profile } from "./components/Profile";
import { SocialLinks } from "./components/SocialLinks";
import { NavLinks } from "./components/NavLinks";
import type { SocialLink } from "./components/SocialLinks";
import type { NavLink } from "./components/NavLinks";

// Import language files
import enLocale from "./locales/en.json";
import zhLocale from "./locales/zh.json";

type Lang = "en" | "zh";
type LocaleType = typeof enLocale;

const locales: Record<Lang, LocaleType> = {
  en: enLocale,
  zh: zhLocale,
};

const socialLinks: SocialLink[] = [
  {
    url: "https://github.com/xxnuo",
    icon: FiGithub,
    title: "GitHub Profile",
    actionType: "default"
  },
  {
    url: "https://x.com/realxxnuo",
    icon: FaXTwitter,
    title: "Twitter Profile",
    actionType: "default"
  },
  {
    url: "#",
    icon: FaWeixin,
    title: "WeChat Profile",
    actionType: "qrcode",
    actionData: {
      qrCode: wechatQR
    }
  },
  {
    url: "mailto:alexcheery5@gmail.com",
    icon: FiMail,
    title: "Send Email",
    actionType: "email"
  }
];

const navLinks: NavLink[] = [
  { url: "/blog", text: "我的博客" },
  { url: "/portfolio", text: "作品集" },
  { url: "/resume", text: "简历" },
];

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentLang, setCurrentLang] = useState<Lang>(() => {
    // 获取浏览器语言
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("zh") ? "zh" : "en";
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("light-theme");
  };

  const handleLanguageChange = (lang: Lang) => {
    setCurrentLang(lang);
  };

  // 根据当前语言更新导航链接文本
  const localizedNavLinks: NavLink[] = [
    { url: "/blog", text: locales[currentLang].nav.blog },
    { url: "/portfolio", text: locales[currentLang].nav.portfolio },
    { url: "/resume", text: locales[currentLang].nav.resume },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-4 sm:p-8 relative backdrop-blur-md ${
        !isDark ? "light-theme" : ""
      }`}
    >
      <div className="fixed top-0 left-0 right-0 px-6 py-4 flex justify-end items-center gap-4 backdrop-blur-sm">
        <LanguageToggle currentLang={currentLang} onToggle={handleLanguageChange} />
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      <div className="w-full max-w-[400px] flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-md shadow-lg md:max-w-[320px] md:p-6">
        <Profile 
          avatarUrl={avatarImage} 
          name="xxnuo" 
          title={locales[currentLang].profile.title} 
        />

        <SocialLinks links={socialLinks} />
        <NavLinks links={localizedNavLinks} />
      </div>
    </div>
  );
};

export default App;
