import { Metadata } from "next";
import ClientNotFound from "./not-found.client";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "Oops! The page you're looking for doesn't exist.",
  openGraph: {
    title: "Page Not Found",
    description: "Oops! The page you're looking for doesn't exist.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 Not Found",
      },
    ],
  },
};

export default function NotFoundPage() {
  return <ClientNotFound />;
}
