'use-client'
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blue Chapter",
  description: "Đọc chap raw với sự giúp đỡ của AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <link rel="icon" href="flowbite.svg" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
