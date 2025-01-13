import { getRandomColor } from "../utils/RandomColor";

export interface TechStackProps {
  frontend: string[];
  backend: string[];
  tools: string[];
}

export const TechStack = ({ frontend, backend, tools }: TechStackProps) => {
  const renderTechList = (items: string[]) => {
    return items.map((name, index) => (
      <span key={name} className="whitespace-nowrap">
        <span style={{ color: getRandomColor() }}>{name}</span>
        {index < items.length - 1 && " · "}
      </span>
    ));
  };

  return (
    <div className="space-y-3 text-base opacity-90 w-full">
      <div className="space-y-1">
        <p>🎨 前端</p>
        <p className="flex flex-wrap gap-x-1 gap-y-1 pl-4">
          {renderTechList(frontend)}
        </p>
      </div>
      <div className="space-y-1">
        <p>⚡️ 后端</p>
        <p className="flex flex-wrap gap-x-1 gap-y-1 pl-4">
          {renderTechList(backend)}
        </p>
      </div>
      <div className="space-y-1">
        <p>🛠 工具</p>
        <p className="flex flex-wrap gap-x-1 gap-y-1 pl-4">
          {renderTechList(tools)}
        </p>
      </div>
    </div>
  );
}; 

// Usage
/*
import { TechStack } from "./components/TechStack";

const techData = {
  frontend: ["React", "Vue", "etc."],
  backend: ["Go",  "Python","Node.js", "etc."],
  tools: ["Docker", "Git", "Linux", "SQL", "noSQL", "Redis", "etc."],
};

<TechStack frontend={techData.frontend} backend={techData.backend} tools={techData.tools} />
*/