import axios from "axios";
import { FormValues, Note } from "@/types/note";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  tag: string;
}

// TAGS
export type NoteTag = "Work" | "Todo" | "Personal" | "Meeting" | "Shopping";
export const tags: NoteTag[] = [
  "Work",
  "Todo",
  "Personal",
  "Meeting",
  "Shopping",
];
export async function fetchNotesByTag(tagName: NoteTag) {
  return Promise.resolve([]);
}

// NOTES

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesHttpResponseWithPage extends NotesHttpResponse {
  currentPage: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string
): Promise<NotesHttpResponseWithPage> => {
  const params = {
    ...(search && { search }),
    ...(tag && { tag }),
    page,
    perPage: 12,
  };

  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };

  const response = await axios.get<NotesHttpResponse>(
    "https://notehub-public.goit.study/api/notes",
    { params, headers }
  );

  return {
    ...response.data,
    currentPage: page,
  };
};

export const createNote = async (note: FormValues): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    note,
    { headers }
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    { headers }
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  };
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    { headers }
  );
  return response.data;
};

//noteStore.ts

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const noteDraft = async (data: NewNoteData) => {
  const res = await axios.post<Note>("/notes", data);
  return res.data;
};
