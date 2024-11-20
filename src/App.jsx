import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Change here
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./components/AuthProvider";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import 'bootstrap-icons/font/bootstrap-icons.css';
import GalleryPage from "./pages/GalleryPage";
import FrontPage from "./pages/FrontPage";

export default function App() {
  return (
    <AuthProvider>
      <Router> {/* Changed from BrowserRouter to HashRouter */}
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
