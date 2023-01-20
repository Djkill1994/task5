import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useState, useRef, useCallback, useLayoutEffect } from "react";

const generateItems = (amount: number): any => {
  const arr = Array.from(Array(amount));
  return arr.map((number, i) => ({
    number: "4" + i,
    id: i,
    fullNamed: "Kolkol Golgol Holhol" + i,
    address: "street Gploj. 12" + i,
    phone: "1886610028" + i,
  }));
};

const USERS_TABLE_TITLES = ["#", "ID", "Full name", "Address", "Phone"];

export const UsersTable: FC = () => {
  const [rows, setRows] = useState(generateItems(20));
  const tableEl = useRef<HTMLDivElement | null>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);

  const scrollListener = useCallback(() => {
    if (tableEl.current) {
      const bottom =
        tableEl.current.scrollHeight - tableEl.current.clientHeight;

      if (!distanceBottom) {
        setDistanceBottom(Math.round(bottom * 0.2));
      }
      if (tableEl.current.scrollTop > bottom - distanceBottom) {
        setRows(generateItems(rows.length + 10));
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
          {rows.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.number}</TableCell>
              <TableCell>{user.fullNamed}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
