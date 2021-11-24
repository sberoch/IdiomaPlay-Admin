import { TextField } from '@material-ui/core';
import { Button as ButtonCore }from "@material-ui/core";
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
import { config } from '../../common/config';
import Alerts from "../alerts/Alerts";


export const LessonsAdd = (props: any) => {
    const [showError, setShowError] = useState(false);
    const [title, setTitle] = useState("");
    const [exercises, setExercises] = useState([]);

    const handleTitleChange = (e: any) => {
        setTitle(e.target.value)
    }

    const inputErrors = () => {
        const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
        return titleOutOfRange
    }

    const sendLesson = () => {
        if (!inputErrors()) {
            props.handleSubmit({"title":title, "exercises":exercises})
        } else {
            setShowError(true)
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <Typography variant="h5" gutterBottom>Crear nueva lección</Typography>
                    <Box display="flex" sx={{ marginTop:5}}>
                    <TextField id="filled-basic" label="Titulo de la lección" variant="filled" value={title} onChange={handleTitleChange}/>
                    </Box>

                    <Grid item xs={12} md={6}>
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Ejercicios
                        </Typography>
                        <div>
                            <List dense={true}>
                            {exercises.map((lesson: any) => {
                            return(
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

                        <Button>Crear ejercicio</Button>

                        <ButtonCore
                        style={{
                            borderRadius: 35,
                            backgroundColor: "lightBlue",
                            padding: "18px 36px",
                            fontSize: "18px",
                        }}
                        onClick={() => {sendLesson()}}
                        variant="contained"
                        startIcon={<SaveIcon />}
                        >
                        Agregar
                        </ButtonCore>

                    </Grid>
                </Grid>
            </Grid>
            <Alerts
            showError={showError}
            setShowError={setShowError}
          />
        </div>
    )
}