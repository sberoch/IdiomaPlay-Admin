import {
  Box, MenuItem,
  TextField,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

interface Option {
  id: number;
  text: string;
}

interface Props {
  type: string;
  options: any;
  setOptions: any;
  correctOption: string;
  setCorrectOption: any;
}

const types = {
  complete: { text: "complete", amount: 4 },
  listen: { text: "listen", amount: 6 },
  translate_old_to_new: { text: "translate_old_to_new", amount: 6 },
  translate_new_to_old: { text: "translate_new_to_old", amount: 6 },
};

export default function AddExerciseList(props: Props) {
  const { correctOption, setCorrectOption, type, options, setOptions } = props;
  const [text, setText] = useState("");

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleNewOption = () => {
    //If options doesn't already exist
    if (!options.some((actualOption: Option) => actualOption.text === text)) {
      setOptions((prev: Option[]) => [...prev, { id: options.length + 1, text: text }]);
    }
  };

  const getInput = () => {
    const totalOptions = type === types.complete.text ? types.complete.amount : types.listen.amount;

    if (options.length < totalOptions) {
      return (
        <Box display="flex" sx={{ marginTop: -4 }}>
          <TextField
            id="filled-basic"
            label="Nueva opcion"
            variant="filled"
            value={text}
            onChange={handleTextChange}
            size="medium"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleNewOption}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      );
    }
  };

  const handleCorrectOptionChange = (event: any) => {
    setCorrectOption(event.target.value as string);
  };


  const removeOption = (id: number) => {
    setOptions((prev: any) => {
      return prev.filter((actualPrevOption: any) => actualPrevOption.id !== id);
    });
  };

  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {options.map((option: Option) => {
          const { id, text } = option;
          return (
            <ListItem key={id} sx={{ m: 0 }} divider={true}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
              <IconButton onClick={() => removeOption(id)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>

      {getInput()}

      <Box sx={{ marginTop: 50 }}>
        <Typography variant="h6" gutterBottom>
          Agregar opción correcta
        </Typography>
      </Box>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Opcion correcta"
        onChange={handleCorrectOptionChange}
        value={correctOption}
        sx={{ marginTop: 1, p: 1, width: 200 }}
      >
        {options.map((option: Option) => {
          return (
            <MenuItem key={option.id} value={option.text}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
