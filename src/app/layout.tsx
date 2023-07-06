import "./globals.css";
import Layout from "@/app/layouts";
import { Providers } from "./redux/provider";

export const metadata = {
  title: "Urban",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <Providers>
    <Layout>{children}</Layout>
  </Providers>
  );
}
