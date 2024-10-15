import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";


export default function RootLayout({ children }) {
  try {
    // fetch('/api/traffic/add')
  } catch (error) {
    console.log(error?.message)
  }
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