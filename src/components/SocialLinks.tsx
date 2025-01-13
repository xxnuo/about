import type { IconType } from "react-icons";
import { useState } from "react";

// 定义链接行为类型
export type LinkActionType = "default" | "qrcode" | "email" | "custom";

// 定义链接行为处理器
export type LinkActionHandler = (link: SocialLink, e: React.MouseEvent | React.KeyboardEvent) => void;

export interface SocialLink {
  url: string;
  icon: IconType;
  title: string;
  actionType: LinkActionType;
  actionData?: {
    qrCode?: string;
    customHandler?: LinkActionHandler;
  };
  className?: string;
}

export interface SocialLinksProps {
  links: SocialLink[];
  size?: "small" | "medium" | "large";
  gap?: "small" | "medium" | "large";
  className?: string;
  onLinkClick?: (link: SocialLink, e: React.MouseEvent | React.KeyboardEvent) => void;
}

// 样式配置
const styles = {
  size: {
    small: "w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]",
    medium: "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px]",
    large: "w-[45px] h-[45px] sm:w-[50px] sm:h-[50px]",
  },
  gap: {
    small: "gap-3",
    medium: "gap-4",
    large: "gap-6",
  },
  icon: {
    small: 18,
    medium: 20,
    large: 22,
  },
  link: "flex items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
  qrDialog: {
    overlay: "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 w-full h-full m-0 p-0",
    content: "bg-white/95 p-8 rounded-xl shadow-2xl max-w-[90vw] max-h-[90vh] relative",
    image: "w-[600px] max-w-full object-contain",
    closeButton: "absolute inset-0 w-full h-full cursor-default",
  }
};

// QR码对话框组件
export interface QRDialogProps {
  qrCode: string;
  onClose: () => void;
}

const QRDialog = ({ qrCode, onClose }: QRDialogProps) => {
  // 处理对话框失焦
  const handleDialogClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains(styles.qrDialog.overlay.split(' ')[0])) {
      onClose();
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <dialog 
      open 
      className={styles.qrDialog.overlay}
      onClick={handleDialogClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.qrDialog.content}>
        <button
          type="button"
          className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center hover:opacity-80 transition-all"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          aria-label="Close dialog"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <img src={qrCode} alt="QR Code" className={styles.qrDialog.image} />
      </div>
    </dialog>
  );
};

export const SocialLinks = ({ 
  links, 
  size = "medium", 
  gap = "medium",
  className = "",
  onLinkClick 
}: SocialLinksProps) => {
  const [qrState, setQRState] = useState<{ show: boolean; code: string }>({ 
    show: false, 
    code: "" 
  });

  const handleAction = (link: SocialLink, e: React.MouseEvent | React.KeyboardEvent) => {
    // 调用外部处理器
    onLinkClick?.(link, e);

    // 内部处理逻辑
    switch (link.actionType) {
      case "qrcode":
        if (link.actionData?.qrCode) {
          e.preventDefault();
          setQRState({ show: true, code: link.actionData.qrCode });
        }
        break;
      case "email":
        e.preventDefault();
        window.location.href = link.url;
        break;
      case "custom":
        if (link.actionData?.customHandler) {
          e.preventDefault();
          link.actionData.customHandler(link, e);
        }
        break;
    }
  };

  return (
    <>
      <div className={`flex ${styles.gap[gap]} my-4 ${className}`}>
        {links.map((link) => (
          <div key={link.url} className="relative">
            <a
              href={link.actionType === "default" ? link.url : "#"}
              className={`${styles.size[size]} ${styles.link} ${link.className || ""}`}
              title={link.title}
              aria-label={link.title}
              onClick={(e) => handleAction(link, e)}
              onKeyDown={(e) => e.key === "Enter" && handleAction(link, e)}
              target={link.actionType === "default" ? "_blank" : undefined}
              rel={link.actionType === "default" ? "noopener noreferrer" : undefined}
            >
              <link.icon size={styles.icon[size]} className="sm:text-2xl" />
            </a>
          </div>
        ))}
      </div>

      {qrState.show && (
        <QRDialog
          qrCode={qrState.code}
          onClose={() => setQRState({ show: false, code: "" })}
        />
      )}
    </>
  );
}; 