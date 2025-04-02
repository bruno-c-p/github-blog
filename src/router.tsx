import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { DefaultLayout } from "./_layouts/default-layout";
import { Issue } from "./pages/issue/issue";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/issues/:id" element={<Issue />} />
            </Route>
        </Routes>
    )
}