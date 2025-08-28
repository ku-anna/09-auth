import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

// NOTES
export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagNote = slug[0] === "All" ? "" : slug[0] || "";

  const cookieHeader = cookies().toString();

  const initialData = await fetchNotes(cookieHeader, "", 1, tagNote);

  return (
    <NotesClient
      initialData={initialData}
      initialTag={tagNote}
      cookieHeader={cookieHeader}
    />
  );
}

// META
export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "All";
  const tagLabel = tag === "All" ? "All Notes" : `Notes tagged "${tag}"`;

  return {
    title: `${tagLabel} – Notes Dashboard`,
    description: `Browse your notes${
      tag === "All" ? "" : ` filtered by "${tag}"`
    }.`,
    openGraph: {
      title: `${tagLabel} – Notes Dashboard`,
      description: `Browse your notes${
        tag === "All" ? "" : ` filtered by "${tag}"`
      }.`,
      url: `https://notehub.com/notes/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notes Dashboard",
        },
      ],
    },
  };
}
