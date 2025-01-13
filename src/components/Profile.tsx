export interface ProfileProps {
  avatarUrl: string;
  name: string;
  title: string;
}

export const Profile = ({ avatarUrl, name, title }: ProfileProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={avatarUrl}
        alt={`${name}'s Profile`}
        className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-full object-cover border-4 border-white/10 transition-all duration-300 hover:scale-105 hover:rotate-6 shadow-lg"
      />
      <h1 className="text-3xl sm:text-4xl font-bold m-0 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text shadow-sm md:text-3xl">
        {name}
      </h1>
      <p className="text-base sm:text-lg opacity-80 m-0 font-medium">{title}</p>
    </div>
  );
}; 