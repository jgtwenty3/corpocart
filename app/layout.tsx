import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="relative w-2/3 md:w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full  flex justify-between items-center p-3 text-sm">
                  <div className="flex items-center gap-5 font-semibold text-md md:text-3xl">
                    <Link href={"/"}>CORP-O-CART</Link>
                  </div>
                  <div className="flex items-center gap-5">
                    <Link href={"/products"}>PRODUCTS</Link>
                    <Link href={"/owners"}>OWNERS</Link>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 p-5 flex-grow">
                {children}
              </div>
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-8">
                <p className="text-lg">POWERED BY GREED</p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
