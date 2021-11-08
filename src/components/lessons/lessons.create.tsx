import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import {
  ArrayInput, FormWithRedirect, SelectArrayInput
} from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";


export const LessonsCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercisesChosen, setExercisesChosen] = useState<string[]>([])
  let history = useHistory();

  useEffect(() => {
    async function fetchLessons() {
      const response = await api.get('exercises');
      setExercises(response.data.items)
      console.log(exercises)
    }
    fetchLessons();
  }, [])

  const addExerciseChosen = (event: any) => {
    setExercisesChosen((prev) => {
      console.log(event.target.value)
      return event.target.value
    })
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }


  const handleSubmit = async () => {
    //Postear al back
    const res = await api.post('/lessons', {
      title,
      exercisesIds: exercisesChosen.map(actual => +actual)
    })
    console.log(res);
    //Redirect
    history.push("/lessons");
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
              paddingTop: 20,
              paddingLeft: 20,
            }}
          >
            <Box sx={{ paddingBottom: 35}}>
              <Typography variant="h6" gutterBottom>Crear nueva leccion</Typography>
            </Box>
            <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={handleTitleChange} />
            <Box sx={{ paddingTop: 50, minWidth: 220, width: "auto" }}>
              <ArrayInput source="Ejercicios">
                <SelectArrayInput
                  choices={exercises}
                  optionText={"sentence"}
                  optionValue="id"
                  variant="outlined"
                  label="Elegí un ejercicio"
                  onChange={addExerciseChosen}

                />
              </ArrayInput>
            </Box>
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "lightBlue",
                padding: "18px 36px",
                fontSize: "18px"
              }}
              onClick={handleSubmit}
              variant="contained"
              startIcon={<SaveIcon />} >
              Agregar
            </Button>

          </Box>
        </form>
      )}
    />
  )
}

