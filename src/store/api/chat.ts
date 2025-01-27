import { createApi } from "@reduxjs/toolkit/query/react";
import { tokenFetchBaseQuery } from "./api";

export type Message = {
  id: string;
  senderId: string;
  message: string;
  roomId: string;
};

export type Room = {
  id: string;
  participant1: string;
  participant2: string;
  appointmentId: string;
};

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: tokenFetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["Rooms", "Messages"],
  endpoints: (builder) => ({
    createRoom: builder.mutation<
      Room,
      { participant: string; appointmentId: string }
    >({
      query: (room) => ({
        url: "/rooms",
        method: "POST",
        body: room,
      }),
      invalidatesTags: [{ type: "Rooms" }],
    }),
    getRooms: builder.query<Room[], undefined>({
      query: () => ({
        url: "/rooms",
        method: "GET",
      }),
      providesTags: [{ type: "Rooms" }],
    }),
    createMessage: builder.mutation<Message, Omit<Message, "id">>({
      query: (message) => ({
        url: `/rooms/${message.roomId}/messages`,
        method: "POST",
        body: message,
      }),
      invalidatesTags: [{ type: "Messages" }],
    }),
    getMessages: builder.query<Message[], string>({
      query: (roomId) => ({
        url: `/rooms/${roomId}/messages`,
        method: "GET",
      }),
      providesTags: [{ type: "Messages" }],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetRoomsQuery,
} = chatApi;
