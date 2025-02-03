import type { Metadata } from "next";
import { ReactQueryClientProvider } from "@/provider/ReactQueryClient";
import "./globals.css";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "서재췤",
  description: "내가 읽은 책을 관리하는 페이지",
  icons: {
    icon: "/favicon.ico",
  },
};

const myFont = localFont({
  src: [
    { path: "../../public/fonts/NanumMyeongjo.woff" },
    { path: "../../public/fonts/PretendardVariable.woff2" },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${myFont.className} bg-neutral-100`}>
        <div id="global-modal" />
        <Navbar />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
