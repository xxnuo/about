import { useState, useRef, useEffect } from "react";
import { FaLanguage } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

type Lang = "en" | "zh";

interface LanguageToggleProps {
  currentLang: Lang;
  onToggle: (lang: Lang) => void;
}

interface Language {
  code: Lang;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "zh", name: "Chinese", nativeName: "中文" },
];

export const LanguageToggle = ({ currentLang, onToggle }: LanguageToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        title="Change Language"
      >
        <FaLanguage className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">{currentLanguage.nativeName}</span>
        <IoMdArrowDropdown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-white/10 backdrop-blur-md shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full px-4 py-2 text-left hover:bg-white/20 transition-colors flex items-center justify-between ${
                currentLang === lang.code ? "bg-white/20" : ""
              }`}
              onClick={() => {
                onToggle(lang.code);
                setIsOpen(false);
              }}
            >
              <span>{lang.nativeName}</span>
              <span className="text-sm opacity-60">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 