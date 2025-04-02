import { ProfileCard } from "./components/profile";
import { SearchForm } from "./components/search-form";
import { BlogContext } from "../../contexts/blog-context";
import { useContextSelector } from "use-context-selector";
import { Card } from "./components/card";

export function Home() {
    const issues = useContextSelector(BlogContext, (context) => context.issues)
    const totalIssues = useContextSelector(BlogContext, (context) => context.totalIssues)
    const totalIssuesText = totalIssues === 1 ? 'publicação' : 'publicações'

    return (
        <>
            <ProfileCard />
            <div className="flex flex-col gap-4 mt-16">
                <div className="flex justify-between items-center">
                    <h2 className="text-base-subtitle text-lg font-bold">Publicações</h2>
                    <span className="text-sm text-base-span">{totalIssues} {totalIssuesText}</span>
                </div>
                <SearchForm />
            </div>
            <div className="grid grid-cols-2 gap-8 mt-12">
                {issues.map((issue) => (
                    <Card key={issue.number} issue={issue} />
                ))}
            </div>
        </>
    );
}
