import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import NoticeBanner from "../Home/NoticeBanner.jsx";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NoticeBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};


export default PublicLayout;
