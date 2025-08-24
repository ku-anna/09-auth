import axios from "axios";
import { NotesByTagResponse, NotesResponseWithPage } from "./api";
import { FormValues, Note } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotesByTag(
  tag: string
): Promise<NotesByTagResponse> {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };
  const res = await axios.get<NotesByTagResponse>(`${BASE_URL}/notes`, {
    params: { tag },
    headers,
  });
  return res.data;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag: string
): Promise<NotesResponseWithPage> => {
  const params = {
    ...(search && { search }),
    ...(tag && { tag }),
    page,
    perPage: 12,
  };
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };
  const response = await axios.get<NotesResponseWithPage>(`${BASE_URL}/notes`, {
    params,
    headers,
  });
  return { ...response.data, currentPage: page };
};

export const createNote = async (note: FormValues): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers,
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };
  const response = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers,
  });
  return response.data;
};
