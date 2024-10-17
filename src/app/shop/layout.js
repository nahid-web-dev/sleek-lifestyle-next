import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";


export default function RootLayout({ children }) {
  return (
    <div className='min-h-screen' >
      <Navbar />
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}