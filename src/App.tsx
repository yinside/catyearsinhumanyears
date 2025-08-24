import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "@/pages/Home";
import ArticleList from "@/pages/ArticleList";
import Article from "@/pages/Article";
import CMSAdmin from "@/components/CMSAdmin";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/admin" element={<CMSAdmin />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          <Route path="/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
