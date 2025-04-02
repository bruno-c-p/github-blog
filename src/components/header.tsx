export function Header() {
    return (
        <header className="bg-[url(/cover.png)] bg-center bg-cover pt-16 pb-32">
            <div className="flex flex-col items-center gap-5">
                <img src="/logo.svg" alt="Github Blog" />
                <h1 className="text-2xl font-mono uppercase text-blue">Github Blog</h1>
            </div>
        </header>
    );
};