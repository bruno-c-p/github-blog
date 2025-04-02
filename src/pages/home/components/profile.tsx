import { ArrowSquareOut, Buildings, GithubLogo, Users } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { BlogContext } from "../../../contexts/blog-context";

export function ProfileCard() {
    const user = useContextSelector(BlogContext, (context) => context.user);

    return (
        <div className="bg-base-profile py-8 px-10 rounded-lg shadow-lg flex items-stretch gap-8">
            <img
                src={user?.avatar_url}
                alt={user?.name ?? ""}
                className="rounded-lg w-36 h-36"
            />
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between mb-2">
                        <h2 className="text-2xl text-base-title font-bold">{user?.name}</h2>
                        <a href={user?.html_url} target="_blank" rel="noreferrer" className="text-blue hover:underline font-bold text-xs uppercase flex gap-2">
                            Github
                            <ArrowSquareOut weight="bold" size={16} />
                        </a>
                    </div>
                    <p className="text-base-text line-clamp-2 mb-6">
                        {user?.bio}
                    </p>
                </div>
                <div className="flex items-center gap-6 mt-auto">
                    <span className="text-base-span flex items-center gap-2">
                        <GithubLogo size={18} weight="fill" className="text-base-label" />
                        {user?.login}
                    </span>
                    <span className="text-base-span flex items-center gap-2">
                        <Buildings size={18} weight="fill" className="text-base-label" />
                        {user?.company}
                    </span>
                    <span className="text-base-span flex items-center gap-2">
                        <Users size={18} weight="fill" className="text-base-label" />
                        {user?.followers} seguidores
                    </span>
                </div>
            </div>
        </div>
    );
};
