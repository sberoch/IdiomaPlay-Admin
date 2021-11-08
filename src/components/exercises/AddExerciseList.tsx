import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";

interface Option {
  id: number;
  text: string;
}

interface Props {
  title: string;
  sentence: string;
  type: string;
}

const types = {
  complete: { text: "complete", amount: 4 },
  listen: { text: "listen", amount: 6 },
  translate_old_to_new: { text: "translate_old_to_new", amount: 6 },
  translate_new_to_old: { text: "translate_new_to_old", amount: 6 },
};

export default function AddExerciseList(props: Props) {
  const { type } = props;
  const [options, setOptions] = useState<Option[]>([]);
  // const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");
  const [correctOption, setCorrectOption] = useState<string>("");
  let history = useHistory();

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleNewOption = () => {
    setOptions((prev) => [...prev, { id: options.length + 1, text: text }]);
  };

  const getInput = () => {
    const totalOptions = type === types.complete.text ? 4 : 6;

    if (options.length < totalOptions) {
      return (
        <TextField
          id="filled-basic"
          label="Nueva opcion"
          variant="filled"
          value={text}
          onChange={handleTextChange}
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleNewOption}>
                <AddIcon />
              </IconButton>
            ),
          }}
        />
      );
    }
  };

  const handleCorrectOptionChange = (event: any) => {
    setCorrectOption(event.target.value as string);
  };

  const handleSubmit = async () => {
    //Postear al back
    const { title, sentence, type } = props;
    const res = await api.post("/exercises", {
      title,
      sentence,
      type,
      options: options.map((option) => option.text),
      correctOption,
    });

    console.log(res);
    //Redirect
    history.push("/exercises");
  };

  const removeOption = (id: number) => {
    setOptions((prev) => {
      return prev.filter((actualPrevOption) => actualPrevOption.id !== id);
    });
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {options.map((option) => {
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

      <Box sx={{ m: 5 }} />
      <Typography variant="h6" gutterBottom>
        Agregar opción correcta
      </Typography>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Opcion correcta"
        onChange={handleCorrectOptionChange}
        value={correctOption}
        sx={{ marginTop: 1, p: 1, width: 200 }}
      >
        <MenuItem value="None">
          <em>None</em>
        </MenuItem>
        {options.map((option) => {
          return (
            <MenuItem key={option.id} value={option.text}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>

      <Box sx={{ m: 5 }} />

      <Button
        style={{
          borderRadius: 35,
          backgroundColor: "lightBlue",
          padding: "18px 36px",
          fontSize: "18px",
        }}
        onClick={handleSubmit}
        variant="contained"
        startIcon={<SaveIcon />}
      >
        Agregar
      </Button>
    </Box>
  );
}
