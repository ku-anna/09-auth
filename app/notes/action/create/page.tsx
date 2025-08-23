import NoteFormClient from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new note",
  description: "Post a new note to not forget anything.",
  openGraph: {
    title: "Create a new note",
    description: "Post a new note to not forget anything.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteFormClient />
      </div>
    </main>
  );
};
export default CreateNote;
