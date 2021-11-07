import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button, Container, MenuItem, Select, TextField } from '@material-ui/core';
import api from '../../api/axios';

import { useHistory } from "react-router-dom";

interface Option {
  id: number,
  text: string
}

interface Props {
  title: string,
  sentence: string,
  type: string
}

export default function AddExerciseList(props: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");
  const [correctOption, setCorrectOption] = useState<string>("")
  let history = useHistory();

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  }

  const handleNewOption = () => {
    setOptions((prev) => [...prev, {id: options.length + 1, text: text}]);
  }

  const getInput = () => {
    if (showInput) {
      return (
        <TextField id="filled-basic" label="Name" variant="filled" value={text} onChange={handleTextChange}
          InputProps={{endAdornment: 
            <IconButton onClick={handleNewOption}>
              <AddIcon />
            </IconButton>}}
      />
      )
    } else {
      return (
        <Button onClick={() => { setShowInput(true) }}>
         Agregar
        </Button>
      );
    }
  }

  const handleCorrectOptionChange =  (event: any) => {
    setCorrectOption(event.target.value as string);
  };


  const handleSubmit = async () => {
    //Postear al back
    const { title, sentence, type } = props;
    const res = await api.post('/exercises', {
      title, sentence, type,
      options: options.map(option => option.text), 
      correctOption
    })
    console.log(res);
    //Redirect
    history.push("/exercises");
  }

  return (
    <Container>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {options.map((option) => {
          const {id, text} = option;
          console.log(option)
          return (
            <ListItem key={id}>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      { getInput() }

      <Box sx={{ m: 5 }} />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Opcion correcta"
        onChange={handleCorrectOptionChange}
        value={correctOption}
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

      <Button onClick={handleSubmit}>
        Agregar
      </Button>
      
    </Container>
  );
}