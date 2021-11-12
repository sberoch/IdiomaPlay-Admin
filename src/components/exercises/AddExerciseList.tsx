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
import Alerts from '../alerts/Alerts'
import { consts } from "../../common/config";
import api from "../../api/axios";

interface Option {
  id: number;
  text: string;
}

interface Props {
  title: string;
  sentence: string;
  type: string;
  options: any;
  setOptions: any;
}

const types = {
  complete: { text: "complete", amount: 4 },
  listen: { text: "listen", amount: 6 },
  translate_old_to_new: { text: "translate_old_to_new", amount: 6 },
  translate_new_to_old: { text: "translate_new_to_old", amount: 6 },
};

export default function AddExerciseList(props: Props) {
  const { title, sentence, type, options, setOptions } = props;
  const [text, setText] = useState("");
  const [correctOption, setCorrectOption] = useState<string>("");
  const [showError, setShowError] = useState(false)
  let history = useHistory();

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const handleNewOption = () => {
    //If options doesn't already exist
    if (!options.some((actualOption: Option) => actualOption.text === text)){
      setOptions((prev: Option[]) => [...prev, { id: options.length + 1, text: text }]);
    }
  };

  const getInput = () => {
    const totalOptions = type === types.complete.text ? types.complete.amount : types.listen.amount;

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

  const inputErrors = () => {
    const amoutOfOptions = type === types.complete.text ? types.complete.amount : types.listen.amount
    const titleOutOfRange = title.length > consts.maxTitleLength || title.length < consts.minStringLength
    const sentenceOutOfRange = sentence.length < consts.minStringLength;
    const sentenceDoesntContainAsterik = !sentence.includes("*");
    const notEnoughOptions = options.length !== amoutOfOptions
    const correctOptionIsEmpty = correctOption === ""
    const correctOptionIsInOptions = options.some((actualOption:Option) => actualOption.text === correctOption)

    return  titleOutOfRange || sentenceOutOfRange || sentenceDoesntContainAsterik ||
            notEnoughOptions || correctOptionIsEmpty || 
            !correctOptionIsInOptions 
  }

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      const res = await api.post("/exercises", {
        title,
        sentence,
        type,
        options: options.map((option: Option) => option.text),
        correctOption,
      });
  
      console.log(res);
      //Redirect
      history.push("/exercises");
    } else {
      setShowError(true);
    }
  };

  const removeOption = (id: number) => {
    setOptions((prev: any) => {
      return prev.filter((actualPrevOption: any) => actualPrevOption.id !== id);
    });
  };

  return (
    <Box sx={{ marginTop: 10 }}>
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
        {options.map((option: Option) => {
          return (
            <MenuItem key={option.id} value={option.text}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>

      <Box sx={{ m: 5 }} />

      <Alerts
        showError={showError}
        setShowError={setShowError}
      />

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
