import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Naigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book-Lib",
  description: "Website for book information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
