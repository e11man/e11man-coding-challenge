import "./globals.css";

import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Github, Linkedin, Twitter } from "lucide-react";

const footerContent = {
  logo: (
    <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
      CE
    </span>
  ),
  brandName: "Conference Explorer",
  socialLinks: [
    {
      icon: <Twitter className="size-4" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Linkedin className="size-4" />,
      href: "https://www.linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Github className="size-4" />,
      href: "https://github.com",
      label: "GitHub",
    },
  ],
  mainLinks: [
    { href: "/", label: "Conferences" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/admin", label: "Admin" },
  ],
  legalLinks: [
    { href: "#privacy", label: "Privacy" },
    { href: "#terms", label: "Terms" },
    { href: "#cookies", label: "Cookies" },
  ],
  copyright: {
    text: "© " + new Date().getFullYear() + " Conference Explorer. All rights reserved.",
    license: "Built with Next.js + Tailwind CSS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <div className="flex-1">{children}</div>
        <Footer {...footerContent} />
      </body>
    </html>
  );
}
