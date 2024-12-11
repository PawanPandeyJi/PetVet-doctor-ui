import { fetchBaseQuery, FetchBaseQueryArgs } from "@reduxjs/toolkit/query";

// export const tokenFetchBaseQuery = (args: FetchBaseQueryArgs) =>
//   fetchBaseQuery({
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//     },
//     ...args,
//   });


export const tokenFetchBaseQuery = (args: FetchBaseQueryArgs) =>
  fetchBaseQuery({
    ...args,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });