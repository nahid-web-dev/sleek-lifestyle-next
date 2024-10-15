import localFont from "next/font/local";
import "./globals.css";
import SessionProviderBox from "@/components/SessionProviderBox/SessionProviderBox";
import connectToDB from "@/lib/connectdb";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sleek Lifestyle",
  description: "Main page of sleek-lifestyle. The men's fashion brand.",
};

export default async function RootLayout({ children }) {
  connectToDB()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderBox>
          {children}
        </SessionProviderBox>
      </body>
    </html>
  );
}
