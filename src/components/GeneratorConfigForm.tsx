import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setErrors,
  setLanguage,
  setSeed,
} from "../slice/generatorConfig.slice";
import { AutoFixHigh } from "@mui/icons-material";
import csvDownload from "json-to-csv-export";
import { USERS_TABLE_TITLES } from "./UsersTable";

const MAX_SEED_NUMBER = 1000000;

export const GeneratorConfigForm: FC = () => {
  const dispatch = useDispatch();
  const { language, seed, errors, users } = useSelector(
    (state: RootState) => state.generatorConfig
  );

  return (
    <Box
      border="1px solid #dbdbdb"
      bgcolor="white"
      p="10px"
      borderRadius="5px"
      height="100%"
    >
      <Stack gap="16px">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={({ target: { value } }) => dispatch(setLanguage(value))}
            size="small"
          >
            <MenuItem value="ru">Русский</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="pl">Polski</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Enter errors"
          fullWidth
          value={errors}
          onChange={({ target: { value } }) =>
            dispatch(setErrors(Math.max(0, Math.min(1000, Number(value)))))
          }
          size="small"
          inputProps={{
            type: "number",
          }}
        />
        <Slider
          value={errors}
          valueLabelDisplay="auto"
          onChange={(_, newError) => dispatch(setErrors(newError))}
          step={0.25}
          marks
          min={0}
          max={10}
        />
        <Stack direction="row" gap="4px">
          <TextField
            id="outlined-basic"
            label="Enter seed"
            fullWidth
            value={seed || ""}
            onChange={({ target: { value } }) => dispatch(setSeed(+value))}
            size="small"
            inputProps={{
              type: "number",
            }}
          />
          <IconButton
            onClick={() =>
              dispatch(setSeed(Math.floor(Math.random() * MAX_SEED_NUMBER)))
            }
          >
            <AutoFixHigh />
          </IconButton>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          onClick={() =>
            csvDownload({
              data: users,
              filename: "csvFile",
              delimiter: ",",
              headers: USERS_TABLE_TITLES,
            })
          }
        >
          Download CSV
        </Button>
      </Stack>
    </Box>
  );
};
