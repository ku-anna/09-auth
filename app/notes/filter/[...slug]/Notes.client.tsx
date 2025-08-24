"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { SearchBox } from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { Loader } from "@/components/Loader/Loader";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { ErrorMessageEmpty } from "@/components/ErrorMessageEmpty/ErrorMessageEmpty";
import NoteList from "@/components/NoteList/NoteList";

import { fetchNotes } from "@/lib/api/serverApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./NotesPage.module.css";
import { Note } from "@/types/note";

interface NotesClientProps {
  initialData: {
    notes: Note[];
    totalPages: number;
  };
  initialTag: string;
}

export default function NotesClient({
  initialData,
  initialTag,
}: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  const [tag, setTag] = useState(initialTag);

  useEffect(() => {
    setTag(initialTag);
    setCurrentPage(1);
  }, [initialTag]);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    placeholderData: keepPreviousData,
    initialData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />

        {isSuccess && totalPages > 1 && (
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create">
          <button className={css.button}>Create note +</button>
        </Link>
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && data.notes.length === 0 && <ErrorMessageEmpty />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
