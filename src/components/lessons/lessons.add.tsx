import { TextField } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";
import { ExercisesAdd } from "../exercises/exercises.add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const LessonsAdd = (props: any) => {
  const { lesson } = props;
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState<Array<any>>([]);
  const [actualExercise, setActualExercise] = useState<any>(null);
  const [addingExercise, setAddingExercise] = useState(false);
  const [openRemoveItem, setOpenRemoveItem] = useState(false);
  const [toBeRemovedItem, setToBeRemovedItem] = useState<any>(undefined);

  useEffect(() => {
    console.log(lesson);
    if (lesson) {
      setTitle((prev) => lesson.title);
      setExercises((prev) => lesson.exercises);
    }
  }, [lesson]);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const getNewIdForExercise = (array: any) => {
    if (array.length > 0) {
      const lastExercise = array[array.length - 1];
      return lastExercise.id + 1;
    } else {
      return array.length;
    }
  };

  const handleAddExercise = (exercise: any) => {
    if (actualExercise) {
      setExercises((prev: any) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id === actualExercise.id) {
            exercise.id = actualExercise.id;
            prev[i] = exercise;
          }
        }

        return prev;
      });
    } else {
      setExercises((prev: any) => {
        exercise.id = getNewIdForExercise(prev);
        return [...prev, exercise];
      });
    }
    //Go back to lessons screen
    setAddingExercise(false);
    //Go back to creation mode if you were editing an exercise
    setActualExercise(null);
  };

  const inputErrors = () => {
    if (title.length > config.maxTitleLength) {
      setErrorText(
        `El título de la lección debe contener menos de ${config.maxTitleLength} caracteres`
      );
      return true;
    }
    if (title.length < config.minStringLength) {
      setErrorText(
        `El título de la lección debe contener al menos ${config.minStringLength} caracteres`
      );
      return true;
    }
    if (exercises.length !== 8) {
      setErrorText(`Se deben agregar 8 ejercicios a la lección`);
      return true;
    }
    return false;
  };

  const sendLesson = () => {
    if (!inputErrors()) {
      props.handleSubmit({ title: title, exercises: exercises });
    } else {
      setShowError(true);
    }
  };

  const removeOption = () => {
    setExercises((prev: any) =>
      prev.filter(
        (actualPrevOption: any) => actualPrevOption.id !== toBeRemovedItem.id
      )
    );
    setToBeRemovedItem(undefined);
    setOpenRemoveItem(false);
  };

  const handleRemoveClick = (item: any) => {
    setOpenRemoveItem(true);
    setToBeRemovedItem(item);
  };

  const getAddOrSaveButton = () => {
    if (lesson) {
      return "Guardar";
    } else {
      return "Crear";
    }
  };

  return (
    <div>
      {!addingExercise && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <IconButton
              style={{
                marginTop: -30,
                marginBottom: -10,
                marginLeft: -40,
              }}
              onClick={() => {
                props.setAddingLesson(false);
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box>
              <Typography
                style={{
                  marginTop: -32,
                  marginLeft: 20,
                }}
                variant="h5"
                gutterBottom
              >
                {lesson ? "Editar lección" : "Crear nueva lección"}
              </Typography>
              <Box display="flex" sx={{ marginTop: 5 }}>
                <TextField
                  id="filled-basic"
                  label="Título de la lección"
                  variant="outlined"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Box>

              <Grid item md={10}>
                <Typography sx={{ mt: 6 }} variant="h6" component="div">
                  Ejercicios
                </Typography>
                <div>
                  {exercises.length === 0 && (
                    <Typography
                      style={{
                        width: 200,
                        fontSize: "14px",
                        marginLeft: "0px",
                        marginTop: 12,
                      }}
                    >
                      No has creado un ejercicio aún
                    </Typography>
                  )}
                  {exercises.length > 0 && (
                    <List dense={true}>
                      {exercises.map((exercise: any) => {
                        return (
                          <ListItem
                            key={exercise.id}
                            sx={{
                              width: 300,
                              marginLeft: -2,
                            }}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  handleRemoveClick(exercise);
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={exercise.title} />
                            <IconButton
                              onClick={() => {
                                setActualExercise(exercise);
                                setAddingExercise(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </div>

                <Button
                  style={{
                    marginTop: "10px",
                    marginLeft: "-10px",
                    color: "#3da6c7",
                  }}
                  onClick={() => {
                    setActualExercise(null);
                    setAddingExercise(true);
                  }}
                  startIcon={<AddIcon />}
                >
                  Agregar ejercicio
                </Button>

                <Button
                  style={{ backgroundColor: "#3da6c7" }}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    sendLesson();
                  }}
                  size="large"
                  sx={{ marginTop: 5 }}
                >
                  {getAddOrSaveButton()}
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
      {addingExercise && (
        <ExercisesAdd
          exercise={actualExercise}
          handleSubmit={(exerciseCreated: any) => {
            handleAddExercise(exerciseCreated);
          }}
          setAddingExercise={setAddingExercise}
        />
      )}

      <Alerts
        showError={showError}
        setShowError={setShowError}
        errorText={errorText}
      />

      <Dialog
        open={openRemoveItem}
        onClose={() => setOpenRemoveItem(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Esta seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción es irreversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveItem(false)}>Cancelar</Button>
          <Button onClick={removeOption} autoFocus>
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
