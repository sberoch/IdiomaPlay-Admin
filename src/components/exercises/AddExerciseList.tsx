import { Box, MenuItem, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
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
    if (text.length === 0) return;
    if (!options.some((actualOption: Option) => actualOption.text === text)) {
      setOptions((prev: Option[]) => [
        ...prev,
        { id: options.length + 1, text: text },
      ]);
      setText("");
    }
  };

  const getInput = () => {
    const totalOptions =
      type === types.complete.text
        ? types.complete.amount
        : types.listen.amount;

    if (options.length < totalOptions) {
      return (
        <Box display="flex" sx={{ marginTop: 10 }}>
          <TextField
            id="filled-basic"
            label="Nueva opción"
            variant="outlined"
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
            <ListItem key={id} sx={{ marginTop: 0 }} divider={true}>
              <ListItemText primary={text} />
              <IconButton onClick={() => removeOption(id)}>
                <CloseIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>

      {getInput()}

      <Box sx={{ marginTop: 30 }}>
        <Typography variant="h6" fontSize="11pt" gutterBottom>
          Agregar opción correcta
        </Typography>
      </Box>

      <Select
        onChange={handleCorrectOptionChange}
        value={correctOption}
        sx={{ marginTop: 1, width: 200 }}
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
