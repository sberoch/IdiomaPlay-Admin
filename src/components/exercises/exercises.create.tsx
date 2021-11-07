import { Box, MenuItem, TextField, Typography } from '@material-ui/core';
import { Select } from "@mui/material";
import { useState } from "react";
import {
  FormWithRedirect
} from "react-admin";
import AddExerciseList from "./custom-component";

const exerciseTypes = [
  { id: "complete", name: "complete" },
  { id: "listen", name: "listen" },
  { id: "translate_old_to_new", name: "translate_old_to_new" },
  { id: "translate_new_to_old", name: "translate_new_to_old" },
];

export const ExercisesCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");
  const [type, setType] = useState("");

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const handleSentenceChange = (e: any) => {
    setSentence(e.target.value)
  }

  const handleTypeChange = (e: any) => {
    setType(e.target.value)
  }

  return (
    <FormWithRedirect {...props}
      render={formProps => (
        // here starts the custom form layout
        <form>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              p: 1,
              m: 1,
            }}
          >
            <Typography variant="h6" gutterBottom>Crear ejercicio</Typography>
            <Box display="flex" ml="01em">
              <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={handleTitleChange}/>
            </Box>
            <Box display="flex" ml="01em">
              <TextField id="filled-basic" label="Sentence" variant="filled" value={sentence} onChange={handleSentenceChange}/>
            </Box>


            <Box>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo de ejercicio"
              onChange={handleTypeChange}
              value={type}
            >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                {exerciseTypes.map((actualType) => {
                  return (
                    <MenuItem key={actualType.id} value={actualType.name}>
                      {actualType.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography variant="h6" gutterBottom>Agregar opciones</Typography>
              <AddExerciseList title={title} sentence={sentence} type={type}/>
            </Box>
          </Box>
        </form>
      )}
    />
  )
};
