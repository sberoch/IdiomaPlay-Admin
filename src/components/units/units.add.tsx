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
import { LessonsAdd } from "../lessons/lessons.add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import api from "../../api/axios";

export const UnitsAdd = (props: any) => {
  const { unit } = props;
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [addingLesson, setAddingLesson] = useState(false);
  const [actualLesson, setActualLesson] = useState<any>(null);
  const [openRemoveItem, setOpenRemoveItem] = useState(false);
  const [toBeRemovedItem, setToBeRemovedItem] = useState<any>(undefined);
  const [canDelete, setCanDelete] = useState(true);

  useEffect(() => {
    if (unit) {
      setTitle(unit.title);
      setLessons(unit.lessons);
    }
  }, [unit]);

  useEffect(() => {
    async function getParticipations() {
      const res = await api.get("/participations", {
        params: {
          unit: unit?.id,
        },
      });
      if (res.data.length !== 0) {
        setCanDelete(false);
      }
    }
    getParticipations();
  }, [unit]);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const getNewIdForLesson = (array: any) => {
    if (array.length > 0) {
      const lastLesson = array[array.length - 1];
      return lastLesson.id + 1;
    } else {
      return array.length;
    }
  };

  const removeOption = () => {
    setLessons((prev: any) =>
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

  const handleAddLesson = (lesson: any) => {
    if (actualLesson) {
      setLessons((prev: any) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id === actualLesson.id) {
            lesson.id = actualLesson.id;
            prev[i] = lesson;
          }
        }

        return prev;
      });
    } else {
      setLessons((prev: any) => {
        lesson.id = getNewIdForLesson(prev);
        return [...prev, lesson];
      });
    }
    //Go back to units screen
    setAddingLesson(false);
    //Go back to creation mode if you were editing a lesson
    setActualLesson(null);
  };

  const inputErrors = () => {
    if (title.length > config.maxTitleLength) {
      setErrorText(
        `El t??tulo de la unidad debe contener menos de ${config.maxTitleLength} caracteres`
      );
      return true;
    }
    if (title.length < config.minStringLength) {
      setErrorText(
        `El t??tulo de la unidad debe contener al menos ${config.minStringLength} caracteres`
      );
      return true;
    }
    return false;
  };

  const sendUnit = () => {
    if (!inputErrors()) {
      props.handleSubmit({ title: title, lessons: lessons });
    } else {
      setShowError(true);
    }
  };

  const getAddOrSaveButton = () => {
    if (unit) {
      return "Guardar";
    } else {
      return "Crear";
    }
  };

  return (
    <div>
      {!addingLesson && (
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <IconButton
              style={{
                marginTop: -30,
                marginBottom: -10,
                marginLeft: -40,
              }}
              onClick={() => {
                props.setAddingUnit(false);
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
                {unit ? "Editar unidad" : "Crear nueva unidad"}
              </Typography>

              <Box display="flex" sx={{ marginTop: 5 }}>
                <TextField
                  id="filled-basic"
                  label="T??tulo de la unidad"
                  variant="outlined"
                  value={title}
                  onChange={handleTitleChange}
                />
              </Box>

              <Grid item md={10}>
                <Typography sx={{ mt: 6 }} variant="h6" component="div">
                  Lecciones
                </Typography>
                <div>
                  {lessons.length === 0 && (
                    <Typography
                      style={{
                        width: 200,
                        fontSize: "14px",
                        marginLeft: "0px",
                        marginTop: 12,
                      }}
                    >
                      No has creado una lecci??n a??n
                    </Typography>
                  )}
                  {lessons.length > 0 && (
                    <List dense={true}>
                      {lessons.map((lesson: any) => {
                        return (
                          <ListItem
                            key={lesson.id}
                            sx={{
                              width: 300,
                              marginLeft: -2,
                            }}
                            secondaryAction={
                              <div>
                                {canDelete ? (
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => {
                                      handleRemoveClick(lesson);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                ) : undefined}
                              </div>
                            }
                          >
                            <ListItemText primary={lesson.title} />
                            <IconButton
                              onClick={() => {
                                setActualLesson(lesson);
                                setAddingLesson(true);
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
                    setActualLesson(null);
                    setAddingLesson(true);
                  }}
                  startIcon={<AddIcon />}
                >
                  Agregar lecci??n
                </Button>

                <Button
                  style={{ backgroundColor: "#3da6c7" }}
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    sendUnit();
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
      {addingLesson && (
        <LessonsAdd
          lesson={actualLesson}
          unit={unit}
          setAddingLesson={setAddingLesson}
          handleSubmit={(lessonCreated: any) => {
            handleAddLesson(lessonCreated);
          }}
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
        <DialogTitle id="alert-dialog-title">??Esta seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acci??n es irreversible
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
