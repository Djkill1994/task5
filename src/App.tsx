import { FC } from "react";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/material";
import { UserGenerator } from "./components/UserGenerator";

export const App: FC = () => (
  <Box bgcolor="#FAFAFA" height="100vh">
    <Toaster position="top-right" />
    <UserGenerator />
  </Box>
);
