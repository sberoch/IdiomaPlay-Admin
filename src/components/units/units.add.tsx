import { TextField } from '@material-ui/core';
import { Button as ButtonCore } from "@material-ui/core";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit'
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from "@mui/icons-material/Save";
import { LessonsAdd } from '../lessons/lessons.add';
import { config } from '../../common/config';
import Alerts from "../alerts/Alerts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const UnitsAdd = (props: any) => {
  const { unit } = props;
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [addingLesson, setAddingLesson] = useState(false);
  const [actualLesson, setActualLesson] = useState<any>(null)

  useEffect(() => {
    console.log(unit);
    if (unit) {
      setTitle((prev) => unit.title);
      setLessons((prev) => unit.lessons);
    }
  }, [unit])

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const getNewIdForLesson = (array: any) => {
    if (array.length > 0) {
      const lastLesson = array[array.length - 1];
      return lastLesson.id + 1;
    } else {
      return array.length;
    }
  }

  const removeOption = (id: string) => {
    setLessons((prev: any) => {
      return prev.filter((actualPrevOption: any) => actualPrevOption.title.localeCompare(id) !== 0);
    });
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
      })
    } else {
      setLessons((prev: any) => {
        lesson.id = getNewIdForLesson(prev);
        return [...prev, lesson]
      })
    }
    //Go back to units screen
    setAddingLesson(false);
    //Go back to creation mode if you were editing a lesson
    setActualLesson(null)
  }

  const inputErrors = () => {
    const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
    return titleOutOfRange
  }

  const sendUnit = () => {
    if (!inputErrors()) {
      props.handleSubmit({ "title": title, "lessons": lessons })
    } else {
      setShowError(true)
    }
  }

  const getAddOrSaveButton = () => {
    if (unit) {
      return "Guardar";
    } else {
      return "Agregar"
    }
  }

  return (
    <div>
      {!addingLesson && <Grid container spacing={2}>
        <Grid item sm={12}>
          <IconButton
            style={{
              marginLeft: -40,
              marginTop: -40,
              marginBottom: -10
            }}
            onClick={() => { props.setAddingUnit(false) }}>
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{
            marginLeft: 4
          }}>
            <Typography
              style={{
                marginTop: -38
              }}
              variant="h6"
              gutterBottom>
              Crear nueva unidad
            </Typography>

            <Box display="flex" sx={{ marginTop: 4 }}>
              <TextField id="filled-basic" label="Titulo de la unidad" variant="filled" value={title} onChange={handleTitleChange} />
            </Box>

            <Grid item md={10}>
              <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lecciones
              </Typography>
              <div>
                {lessons.length === 0 &&
                  <Typography
                    style={{
                      width: 200,
                      fontSize: "14px",
                      marginLeft: "0px",
                      marginTop: 12
                    }}>
                    No has creado una lección aún
                  </Typography>
                }
                {lessons.length > 0 && <List dense={true}>
                  {lessons.map((lesson: any) => {
                    return (
                      <ListItem
                        key={lesson.id}
                        sx={{
                          marginTop: 2,
                          width: 300,
                          marginLeft: -2
                        }}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => { removeOption(lesson.title) }}>
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
                          primary={lesson.title}
                        />
                        <IconButton onClick={() => {
                          setActualLesson(lesson);
                          setAddingLesson(true);
                        }}>
                          <EditIcon />
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>}
              </div>

              <Button
                style={{
                  marginTop: "10px",
                  marginLeft: "-10px"
                }}
                onClick={() => {
                  setActualLesson(null);
                  setAddingLesson(true)
                }}
              >
                Crear lección
              </Button>

              <ButtonCore
                style={{
                  borderRadius: 35,
                  backgroundColor: "lightBlue",
                  padding: "18px 36px",
                  fontSize: "18px",
                  marginTop: "25px",
                  marginLeft: "-5px"
                }}
                onClick={() => { sendUnit() }}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                { getAddOrSaveButton() }
              </ButtonCore>

            </Grid>
          </Box>
        </Grid>
      </Grid>}
      {addingLesson &&
        <LessonsAdd
          lesson={actualLesson}
          setAddingLesson={setAddingLesson}
          handleSubmit={(lessonCreated: any) => { handleAddLesson(lessonCreated) }}
        />
      }
      <Alerts
        showError={showError}
        setShowError={setShowError}
      />
    </div>
  )
}