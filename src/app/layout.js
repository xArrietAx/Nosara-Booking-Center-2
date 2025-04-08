import { Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Header } from "@/shared/Header";
import { Footer } from "@/shared/Footer";
import "@/styles/main.css";
import { Providers } from "@/context/Providers";
import metadataDefault from "@/SEO/default"; 
import Script from "next/script";

const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = metadataDefault

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.className}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CF7S1DCT2D"
        ></Script>
        <Script id="google-analytics">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date());

      gtag('config', 'G-CF7S1DCT2D');
    `}
        </Script>
      </head>
      <body>
        <Providers>
        <Header /> 
        {children}
        <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  )}