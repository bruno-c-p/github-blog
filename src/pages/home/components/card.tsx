import { Link } from "react-router-dom";
import { formatDate } from "../../../utils";
import { Issue } from "../../../contexts/blog-context";

interface CardProps {
    issue: Issue
}

export function Card({ issue }: CardProps) {
    return (
        <Link key={issue.number} to={`/issues/${issue.number}`} className="min-h-[236px] bg-base-post p-8 rounded-lg hover:ring-2 hover:ring-base-label transition-all">
            <div className="flex justify-between gap-3">
                <h3 className="text-base-title text-lg font-bold line-clamp-2">{issue.title}</h3>
                <span className="text-sm text-base-span text-nowrap">
                    {formatDate(issue.created_at)}
                </span>
            </div>
            <p className="text-base-text line-clamp-4 mt-5">{issue.body}</p>
        </Link>
    )
}