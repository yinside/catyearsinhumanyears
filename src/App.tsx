import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ArticleList from "@/pages/ArticleList";
import Article from "@/pages/Article";
import CMSAdmin from "@/components/CMSAdmin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/admin" element={<CMSAdmin />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
