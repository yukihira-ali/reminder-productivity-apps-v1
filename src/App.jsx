import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AuthProvider from "./components/AuthProvider";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import 'bootstrap-icons/font/bootstrap-icons.css';
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}