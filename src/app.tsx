import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { BlogProvider } from "./contexts/blog-context";
export function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Router />
      </BlogProvider>
    </BrowserRouter>
  )
}