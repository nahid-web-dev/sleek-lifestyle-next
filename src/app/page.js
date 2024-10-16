import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import sleekBanner from "@/public/images/sleek_banner.png";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FaGlobe, FaLeaf, FaTshirt, FaCogs } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />

      <div className="flex flex-col gap-5 my-10 items-center md:w-[80%] mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <h2 className="text-xl md:text-3xl text-stone-600 text-center">
          Welcome to <Link href="/shop" className="text-rose-500 underline">Sleek-Lifestyle</Link> - Where Style Meets Comfort!
        </h2>

        {/* Button Section */}
        <Link href="/shop" className="text-3xl w-[200px] text-blue-600 border-b border-blue-500 py-2 flex items-center justify-center gap-2 sm:hover:gap-5 transition-all">
          <span>Go to shop</span>
          <FaArrowRight />
        </Link>

        {/* Banner Section */}
        <div className="w-[90%] sm:w-[52%] overflow-hidden rounded-lg sm:rounded-xl">
          <Image
            src={sleekBanner}
            alt="banner"
            className="w-full"
            priority
          />
        </div>

        {/* Sleek Lifestyle Info Section */}
        <div className="bg-gray-50 py-12 px-4 sm:px-6 md:px-16 lg:px-32">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            The Sleek Man: A Lifestyle Beyond Fashion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center mb-12">
            At <span className="text-blue-500 font-semibold">Sleek-Lifestyle</span>, we believe that style is more than what you wear—it&lsquo;s a way of living. Our mission goes beyond offering premium menswear; we strive to inspire confidence, success, and individuality through every piece we create.
          </p>

          {/* Feature Cards */}
          <div className="space-y-10">
            {/* Redefining Modern Masculinity */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaTshirt className="text-rose-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Redefining Modern Masculinity</h2>
                <p className="text-gray-600 mt-2">
                  Sleek-Lifestyle is crafted for the modern man who embraces versatility in his life. From business meetings to weekend getaways, our collections reflect a man who moves seamlessly through different environments without compromising on style or comfort.
                </p>
              </div>
            </div>

            {/* Empowering Through Style */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaArrowRight className="text-blue-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Empowering Through Style</h2>
                <p className="text-gray-600 mt-2">
                  We believe that fashion is a form of self-expression. That&lsquo;s why our designs empower men to express their unique personalities—whether it&lsquo;s a sharp casual shirt for a night out or a tailored piece for an important event.
                </p>
              </div>
            </div>

            {/* Driven by Excellence */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaCogs className="text-green-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Driven by Excellence</h2>
                <p className="text-gray-600 mt-2">
                  Every detail of our clothing is carefully considered, from the precise stitching to the handpicked fabrics. Our commitment to excellence ensures that when you wear Sleek-Lifestyle, you&lsquo;re not just wearing clothes; you&lsquo;re wearing the result of thoughtful craftsmanship and design.
                </p>
              </div>
            </div>

            {/* Lifestyle-First Approach */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaArrowRight className="text-blue-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Lifestyle-First Approach</h2>
                <p className="text-gray-600 mt-2">
                  Our collections are not just about looking good; they&lsquo;re about feeling good. We understand the importance of comfort and function in men&lsquo;s fashion. Our fabrics are chosen to withstand the demands of your busy life while providing the ease and confidence you need.
                </p>
              </div>
            </div>

            {/* Born in Bangladesh, Built for the World */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaGlobe className="text-rose-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Born in Bangladesh, Built for the World</h2>
                <p className="text-gray-600 mt-2">
                  As a brand rooted in Bangladesh, we are proud to celebrate our culture while maintaining a global perspective. Each collection is inspired by the energy of modern life, whether you&lsquo;re navigating the streets of Dhaka or exploring cities abroad.
                </p>
              </div>
            </div>

            {/* Sustainability in Focus */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <FaLeaf className="text-green-500 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Sustainability in Focus</h2>
                <p className="text-gray-600 mt-2">
                  We don&lsquo;t just want you to look good; we want you to feel good about what you wear. That&lsquo;s why we&lsquo;re committed to sustainability, using eco-friendly materials and responsible production processes that respect the environment and the people involved in making our products.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-12">
            <p className="text-lg font-semibold text-gray-700">
              At Sleek-Lifestyle, we&lsquo;re not just shaping men&lsquo;s fashion; we&lsquo;re creating a movement that reflects the bold, effortless confidence of today&lsquo;s man.
            </p>
            <Link href="/shop" className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
              Join the Sleek Movement
            </Link>
          </div>
        </div>

        {/* Why Choose Sleek-Lifestyle Section */}
        <div className="p-4 md:w-[80%] mx-auto text-left">
          <h2 className="text-3xl my-3">Why Choose Sleek-Lifestyle?</h2>
          <h3>At <Link href="/shop" className="text-2xl text-blue-700 underline mx-3">Sleek-Lifestyle,</Link> we&lsquo;re dedicated to providing high-quality fashion that combines sophistication, comfort, and local craftsmanship. Here&lsquo;s why Sleek-Lifestyle is the perfect choice for the modern man:</h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700 mt-5">
            <li>
              <span className="font-bold">Tailored for Comfort:</span> Every item we design is crafted with attention to detail, ensuring a perfect fit that feels as good as it looks.
            </li>
            <li>
              <span className="font-bold">Top-Quality Fabrics:</span> We believe that luxury begins with quality. That&lsquo;s why we use premium fabrics, designed to last and look sharp wear after wear.
            </li>
            <li>
              <span className="font-bold">Fashion Forward:</span> Our designs embrace both classic and contemporary styles, ensuring that you stay ahead of the fashion curve without sacrificing comfort.
            </li>
            <li>
              <span className="font-bold">Bangladeshi Craftsmanship:</span> As a brand born and raised in Bangladesh, we take immense pride in supporting local artisans and showcasing our heritage through our creations.
            </li>
            <li>
              <span className="font-bold">Sustainable Choices:</span> We are committed to reducing our environmental footprint through sustainable production methods and thoughtful material selection.
            </li>
          </ul>
          <h3 className="mt-6">Welcome to Sleek-Lifestyle - Where Style Meets Comfort!</h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}
