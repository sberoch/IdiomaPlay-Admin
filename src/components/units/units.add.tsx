import { TextField } from '@material-ui/core';
import { Button as ButtonCore } from "@material-ui/core";
import { useState } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
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


export const UnitsAdd = (props: any) => {
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState<any[]>([]);
  const [addingLesson, setAddingLesson] = useState(false);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const removeOption = (id: string) => {
    setLessons((prev: any) => {
      return prev.filter((actualPrevOption: any) => actualPrevOption.title.localeCompare(id) !== 0);
    });
  };

  const handleAddLesson = (lesson: any) => {
    let currentLessons = lessons;
    currentLessons.push(lesson);
    setLessons(currentLessons);
    setAddingLesson(false);
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

  return (
    <div>
      {!addingLesson && <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h5" gutterBottom>Crear nueva unidad</Typography>
          <Box display="flex" sx={{ marginTop: 4 }}>
            <TextField id="filled-basic" label="Titulo de la unidad" variant="filled" value={title} onChange={handleTitleChange} />
          </Box>

          <Grid item md={10}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Lecciones
            </Typography>
            <div>
              {lessons.length < 1 && <Typography style={{ fontSize: "14px", marginLeft: "3px" }}>No has creado una lección aún</Typography>}
              {lessons.length > 0 && <List dense={true}>
                {lessons.map((lesson: any) => {
                  return (
                    <ListItem
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
                    </ListItem>
                  );
                })}
              </List>}
            </div>

            <Button onClick={() => setAddingLesson(true)}>Crear lección</Button>

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
              Agregar
            </ButtonCore>

          </Grid>
        </Grid>
      </Grid>}
      {addingLesson &&
        <LessonsAdd handleSubmit={(lessonCreated: any) => { handleAddLesson(lessonCreated) }} />
      }
      <Alerts
        showError={showError}
        setShowError={setShowError}
      />
    </div>
  )
}