import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { github } from '../lib/octokit'

interface User {
    avatar_url: string;
    name: string;
    html_url: string;
    bio: string;
    login: string;
    company: string;
    followers: number;
}

export interface Issue {
    number: number;
    title: string;
    body: string;
    created_at: string;
}

export interface IssueDetails extends Issue {
    user: {
        login: string;
    };
    html_url: string;
    comments: number;
}

interface BlogContextType {
    user: User | null;
    issues: Issue[] | [];
    currentIssue: IssueDetails | null;
    totalIssues: number;
    fetchUser: () => Promise<void>
    fetchIssues: (query?: string) => Promise<void>
    fetchIssue: (id: number) => Promise<void>
}

interface BlogProviderProps {
    children: ReactNode
}

export const BlogContext = createContext({} as BlogContextType)

export function BlogProvider({ children }: BlogProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [currentIssue, setCurrentIssue] = useState<IssueDetails | null>(null);
    const totalIssues = issues.length

    const fetchUser = useCallback(async () => {
        const user = await github.users.getByUsername({
            username: import.meta.env.VITE_GITHUB_USERNAME,
        });
        setUser(user.data as User);
        localStorage.setItem('user', JSON.stringify(user.data));
    }, []);

    const fetchIssues = useCallback(async (query?: string) => {
        const response = await github.search.issuesAndPullRequests({
            q: `${query ? query : ''} repo:${import.meta.env.VITE_GITHUB_USERNAME}/${import.meta.env.VITE_GITHUB_REPO}`,
            sort: 'created',
            order: 'desc',
        });
        setIssues(response.data.items as Issue[]);
    }, []);

    const fetchIssue = useCallback(async (id: number) => {
        const response = await github.issues.get({
            owner: import.meta.env.VITE_GITHUB_USERNAME,
            repo: import.meta.env.VITE_GITHUB_REPO,
            issue_number: id,
        });
        setCurrentIssue(response.data as IssueDetails);
    }, []);

    useEffect(() => {
        fetchUser()
        fetchIssues()
    }, [fetchUser, fetchIssues])

    return (
        <BlogContext.Provider
            value={{
                user,
                issues,
                currentIssue,
                fetchUser,
                fetchIssues,
                fetchIssue,
                totalIssues
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}