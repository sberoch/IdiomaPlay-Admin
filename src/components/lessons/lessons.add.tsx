import { Button as ButtonCore, TextField } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from "@mui/icons-material/Save";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { config } from '../../common/config';
import Alerts from "../alerts/Alerts";
import { ExercisesAdd } from '../exercises/exercises.add';

export const LessonsAdd = (props: any) => {
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState<Array<any>>([]);
  const [addingExercise, setAddingExercise] = useState(false);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const handleAddExercise = (exercise: any) => {
    setExercises((prev: any) => [...prev, exercise]);
    setAddingExercise(false);
  }

  const inputErrors = () => {
    const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
    return titleOutOfRange
  }

  const sendLesson = () => {
    if (!inputErrors()) {
      props.handleSubmit({ "title": title, "exercises": exercises })
    } else {
      setShowError(true)
    }
  }

  return (
    <div>
      {!addingExercise &&
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Crear nueva lección</Typography>
            <Box display="flex" sx={{ marginTop: 4 }}>
              <TextField id="filled-basic" label="Titulo de la lección" variant="filled" value={title} onChange={handleTitleChange} />
            </Box>

            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
                Ejercicios
              </Typography>
              <div>
                <List dense={true}>
                  {exercises.map((lesson: any) => {
                    return (
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Single-line item"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </div>

              <Button
                style={{
                  marginLeft: "-10px"
                }}
                onClick={() => { setAddingExercise(true) }}
              >
                Crear ejercicio
              </Button>

              <ButtonCore
                style={{
                  borderRadius: 35,
                  backgroundColor: "lightBlue",
                  padding: "18px 36px",
                  fontSize: "18px",
                  marginTop: "20px",
                  marginLeft: "-10px"
                }}
                onClick={() => { sendLesson() }}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Agregar
              </ButtonCore>

            </Grid>
          </Grid>
        </Grid>
      }
      {addingExercise &&
        <ExercisesAdd handleSubmit={(exerciseCreated: any) => { handleAddExercise(exerciseCreated) }} />
      }

      <Alerts
        showError={showError}
        setShowError={setShowError}
      />
    </div>
  )
}