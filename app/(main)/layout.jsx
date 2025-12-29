import Footer from "../Footer";
import Navbar from "../Navbar";

export default function MainLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
