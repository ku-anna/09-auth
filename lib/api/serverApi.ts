import { nextServer } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";

interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const checkServerSession = async (cookieHeader: string) => {
  const res = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
};

export const getServerMe = async (cookieHeader: string): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNotes = async (
  cookieHeader: string,
  search: string,
  page: number,
  tag?: string
): Promise<NotesHttpResponse> => {
  const params = {
    ...(search && { search }),
    ...(tag && { tag }),
    page,
    perPage: 12,
  };

  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
    headers: { Cookie: cookieHeader },
  });

  return response.data;
};

export const fetchNoteById = async (
  cookieHeader: string,
  id: string
): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return response.data;
};
