import { Note } from "@/types/note";
import axios from "axios";

export type NoteTag =
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping"
  | "Ideas"
  | "Travel"
  | "Finance"
  | "Health"
  | "Important"
  | "Todo";

export const tags: NoteTag[] = [
  "Work",
  "Todo",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
];

export type CheckSessionResponse = {
  success: boolean;
};

export type CreateNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

export type NoteType = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListType = {
  notes: NoteType[];
  total: number;
};

export type CategoryType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequestData = {
  email: string;
  password: string;
};

export type RegisterRequestData = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export interface NotesByTagResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
  tag: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesResponseWithPage extends NotesResponse {
  currentPage: number;
}

export type NewNoteData = {
  title: string;
  content: string;
  tag: NoteTag;
};

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const getNotes = async (categoryId?: string, title?: string) => {
  const { data } = await nextServer.get<NoteListType>("/notes", {
    params: {
      categoryId,
      title: title,
    },
  });
  return data;
};

export const getSingleNote = async (id: string) => {
  const { data } = await nextServer.get<NoteType>(`/notes/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await nextServer.get<CategoryType[]>(`/categories`);
  return data;
};

export const createNote = async (payload: CreateNoteData) => {
  const { data } = await nextServer.post<NoteType>(`/notes`, payload);
  return data;
};

export const login = async (payload: LoginRequestData) => {
  const { data } = await nextServer.post<User>(`/auth/login`, payload);
  return data;
};

export const register = async (payload: RegisterRequestData) => {
  const { data } = await nextServer.post<User>(`/auth/register`, payload);
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionResponse>(`/auth/session`);
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>(`/auth/me`);
  return data;
};

export const logOut = async () => {
  const { data } = await nextServer.post(`/auth/logout`);
  return data;
};
