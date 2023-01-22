import { Stack } from "@mui/material";
import { FC } from "react";
import { GeneratorConfigForm } from "./GeneratorConfigForm";
import { UsersTable } from "./UsersTable";

export const UserGenerator: FC = () => (
  <Stack direction="row" gap="20px" p="50px">
    <GeneratorConfigForm />
    <UsersTable />
  </Stack>
);
