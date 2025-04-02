import { Link, useParams } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { BlogContext } from "../../contexts/blog-context";
import { useEffect } from "react";
import { formatDate } from "../../utils";
import { ArrowLeft, ArrowSquareOut, GithubLogo, Calendar, ChatCircle } from "phosphor-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Issue() {
    const { id } = useParams()
    const { currentIssue, fetchIssue } = useContextSelector(BlogContext, (context) => context)

    useEffect(() => {
        fetchIssue(Number(id))
    }, [fetchIssue, id])

    if (!currentIssue) {
        return <div>Issue {id}</div>;
    }

    return (
        <>
            <div className="bg-base-profile py-8 px-10 rounded-lg shadow-lg flex items-stretch gap-8">
                <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-2">
                        <div className="flex justify-between mb-5">
                            <Link to="/" className="text-blue hover:underline font-bold text-xs uppercase flex gap-2">
                                <ArrowLeft weight="bold" size={16} />
                                Voltar
                            </Link>
                            <a href={currentIssue.html_url} target="_blank" rel="noreferrer" className="text-blue hover:underline font-bold text-xs uppercase flex gap-2">
                                Ver no Github
                                <ArrowSquareOut weight="bold" size={16} />
                            </a>
                        </div>
                        <h1 className="text-2xl font-bold text-base-title">{currentIssue.title}</h1>
                    </div>
                    <div className="flex items-center gap-6 mt-auto">
                        <span className="text-base-span flex items-center gap-2">
                            <GithubLogo size={18} weight="fill" className="text-base-label" />
                            {currentIssue.user.login}
                        </span>
                        <span className="text-base-span flex items-center gap-2">
                            <Calendar size={18} weight="fill" className="text-base-label" />
                            {formatDate(currentIssue.created_at)}
                        </span>
                        <span className="text-base-span flex items-center gap-2">
                            <ChatCircle size={18} weight="fill" className="text-base-label" />
                            {currentIssue.comments} comentários
                        </span>
                    </div>
                </div>
            </div>
            <div className=" bg-base-background rounded-lg shadow-lg px-8 py-10 text-base-text">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentIssue.body}</ReactMarkdown>
            </div >
        </>
    );
}
