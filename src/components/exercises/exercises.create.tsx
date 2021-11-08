import { Box, MenuItem, TextField, Typography } from '@material-ui/core';
import { Select } from "@mui/material";
import { useState } from "react";
import {
  FormWithRedirect
} from "react-admin";
import AddExerciseList from "./AddExerciseList";

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
            <Box display="flex" sx={{ marginTop:10, p:1}}>
              <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={handleTitleChange}/>
            </Box>
            <Box display="flex" sx={{ marginTop:10, p:1}}>
              <TextField id="filled-basic" label="Sentence" variant="filled" value={sentence} onChange={handleSentenceChange}/>
            </Box>

            <Box display="flex" sx={{ marginTop:10, paddingTop: 30, p:1}}>
              <Typography variant="h6" gutterBottom>Agregar tipo de ejercicio</Typography>  
            </Box>

            <Box sx={{ p:1}}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo de ejercicio"
                onChange={handleTypeChange}
                defaultValue="None"
                value={type}
                sx={{ marginTop: 1, p:1, width: 200 }}
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
              {type &&
                <Box sx={{ marginTop:20, paddingTop:25}}>
                  <Typography variant="h6" gutterBottom>Agregar opciones</Typography>
                  <AddExerciseList title={title} sentence={sentence} type={type}/>
                </Box>
              }
            </Box>
          </Box>
        </form>
      )}
    />
  )
};
