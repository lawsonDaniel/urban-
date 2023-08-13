import "./globals.css";
import Layout from "@/app/layouts";
import { Providers } from "./redux/provider";
import localFont from "@next/font/local";

export const metadata = {
  title: "Urban",
  description: "Generated by create next app",
};

const creatoFont = localFont({
  src: [
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Thin.otf",
      weight: "100",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-ExtraBold.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-Black.otf",
      weight: "900",
    },
    {
      path: "../../public/fonts/creato_display/CreatoDisplay-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-creato",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${creatoFont.variable} font-sans`}>
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </html>
  );
}
