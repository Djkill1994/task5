import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUser {
  id: string;
  email: string;
  username: string;
  status: boolean;
  registrationDate: string;
  lastVisit: string;
}

type IUsersApiResponse = IUser[];

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getUsers: build.query<IUsersApiResponse, void>({
      query() {
        return {
          url: "/users",
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
