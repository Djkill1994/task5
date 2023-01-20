import { Stack } from "@mui/material";
import { FC } from "react";
import { UsersTable } from "../UsersTable";
import { GeneratorConfigForm } from "../GeneratorConfigForm";

export const UserGenerator: FC = () => (
  <Stack direction="row" spacing={2} p="50px">
    <GeneratorConfigForm />
    <UsersTable />
  </Stack>
);
