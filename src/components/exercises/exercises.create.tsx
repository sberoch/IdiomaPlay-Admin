import { Box, FormHelperText, MenuItem, TextField, Typography } from '@material-ui/core';
import { Select, Grid } from "@mui/material";
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

const types = {
  complete: { text: "complete", amount: 4 },
  listen: { text: "listen", amount: 6 },
  translate_old_to_new: { text: "translate_old_to_new", amount: 6 },
  translate_new_to_old: { text: "translate_new_to_old", amount: 6 },
};

interface Option {
  id: number;
  text: string;
}

export const ExercisesCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
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
    if (e.target.value === types.complete.text && options.length > types.complete.amount) {
      setOptions((prev:any) => prev.slice(0, types.complete.amount))
    }
  }

  const getHelpText = () => {
    switch(type) {
      case types.complete.text:
        return "The house * on fire, donde el * indica donde se reemplaza la opción correcta."
      case types.translate_new_to_old.text:
        return "Ingrese la oración a ser traducida."
      case types.translate_old_to_new.text:
        return "Ingrese la oración a ser traducida."
      case types.listen.text:
        return "Ingrese la oración a ser escuchada en la aplicación."
    }
  }

  return (
    <FormWithRedirect {...props}
      render={formProps => (
        <form>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              paddingLeft:0,
              p: 1,
              m: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography variant="h6" gutterBottom>Crear ejercicio</Typography>
                <Box display="flex" sx={{ marginTop:20}}>
                  <TextField id="filled-basic" label="Titulo del ejercicio" variant="filled" value={title} onChange={handleTitleChange}/>
                </Box>


                <Box display="flex" sx={{marginTop: 30}}>
                  <Typography variant="h6" gutterBottom>Agregar tipo de ejercicio</Typography>  
                </Box>
              
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de ejercicio"
                    onChange={handleTypeChange}
                    defaultValue="None"
                    value={type}
                    sx={{ marginTop: 1, p:1, width: 200 }}
                  >
                      {exerciseTypes.map((actualType) => {
                        return (
                          <MenuItem key={actualType.id} value={actualType.name}>
                            {actualType.name}
                          </MenuItem>
                        );
                      })}
                  </Select>

                <Box display="flex" sx={{ marginTop:50}}>
                  <Grid id="top-row" container spacing={3}>
                    <Grid item xs={10}>
                      <TextField id="filled-basic" label="Oración" variant="filled" value={sentence} onChange={handleSentenceChange}/>
                    </Grid>
                    <Grid item xs={10}>
                      <FormHelperText>{getHelpText()}</FormHelperText>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={6}>
                {type &&
                  <Box sx={{ m:0, p:0 }}>
                    <Typography variant="h6" gutterBottom>Agregar opciones</Typography>
                    <Box display="flex" sx={{ marginTop:0}}>
                      <AddExerciseList 
                        title={title} 
                        sentence={sentence} 
                        type={type}
                        options={options}
                        setOptions={setOptions}
                        />
                    </Box>

                  </Box>
                }
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    />
  )
};
