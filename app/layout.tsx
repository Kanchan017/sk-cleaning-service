import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SK Perfect Cleaning Services",
    description:
        "Reliable, affordable, and eco-friendly cleaning solutions for homes and businesses in Strathfield and surrounding areas.",
    icons: {
        icon: "/favicon.ico", // ✅ favicon added
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                    rel="stylesheet"
                />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
