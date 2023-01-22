import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useRegenerateUsersEffect } from "../hooks/useRegenerateUsersEffect";
import { useDispatch, useSelector } from "react-redux";
import { generateMoreUsers } from "../slice/generatorConfig.slice";
import { RootState } from "../store";

export const USERS_TABLE_TITLES = ["#", "ID", "Full name", "Address", "Phone"];

export const UsersTable: FC = () => {
  const dispatch = useDispatch();
  const tableEl = useRef<HTMLDivElement | null>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);
  const { users } = useSelector((state: RootState) => state.generatorConfig);

  const scrollListener = useCallback(() => {
    if (tableEl.current) {
      const bottom =
        tableEl.current.scrollHeight - tableEl.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.2));
      }
      if (tableEl.current.scrollTop > bottom - distanceBottom) {
        dispatch(generateMoreUsers());
      }
    }
  }, [distanceBottom]);

  useLayoutEffect(() => {
    if (tableEl.current) {
      tableEl.current.addEventListener("scroll", scrollListener);
    }
    return () => {
      if (tableEl.current) {
        tableEl.current.removeEventListener("scroll", scrollListener);
      }
    };
  }, [scrollListener]);

  useRegenerateUsersEffect();

  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: 650, margin: "auto", maxHeight: 500 }}
      ref={tableEl}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {USERS_TABLE_TITLES.map((title) => (
              <TableCell key={title} sx={{ fontWeight: "bold" }}>
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.index}>
              <TableCell sx={{ maxWidth: 50, wordBreak: "break-word" }}>
                {user.index}
              </TableCell>
              <TableCell sx={{ maxWidth: 100, wordBreak: "break-word" }}>
                {user.id}
              </TableCell>
              <TableCell sx={{ maxWidth: 150, wordBreak: "break-word" }}>
                {user.fullName}
              </TableCell>
              <TableCell sx={{ maxWidth: 200, wordBreak: "break-word" }}>
                {user.address}
              </TableCell>
              <TableCell sx={{ maxWidth: 150, wordBreak: "break-word" }}>
                {user.phone}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
