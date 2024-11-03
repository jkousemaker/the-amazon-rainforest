import localFont from "next/font/local";
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import { Poppins } from "next/font/google";
import Overlay from "@/components/Overlay";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
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
  title: "Exploring Amazon",
  description: "Explore the Amazon Rainforest in an immersive atmosphere.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <LenisScroll>
          <Overlay />
          <main className="flex relative z-0">{children}</main>
        </LenisScroll>
      </body>
    </html>
  );
}
