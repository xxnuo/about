export interface NavLink {
  url: string;
  text: string;
}

export interface NavLinksProps {
  links: NavLink[];
}

export const NavLinks = ({ links }: NavLinksProps) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[280px]">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className="p-3 sm:p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm font-medium text-sm sm:text-base"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}; 