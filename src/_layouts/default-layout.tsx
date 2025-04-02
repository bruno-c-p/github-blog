import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export function DefaultLayout() {
    return (
        <div className="bg-base-background min-h-screen">
            <Header />
            <main className="max-w-4xl mx-auto -my-20">
                <Outlet />
            </main>
        </div>
    );
}
