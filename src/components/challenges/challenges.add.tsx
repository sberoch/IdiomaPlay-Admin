import { Button as ButtonCore, TextField } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit'
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
import React, { useState } from 'react';
import {
  FormWithRedirect
} from "react-admin";
import { useHistory } from "react-router-dom";
import api from '../../api/axios';
import { config } from '../../common/config';
import Alerts from "../alerts/Alerts";
import { UnitsAdd } from '../units/units.add';

export const ChallengesAdd = (props: any) => {
    const [showError, setShowError] = useState(false);
    const [title, setTitle] = useState("");
    const [units, setUnits] = useState<any[]>([]);
    const [addingUnit, setAddingUnit] = useState(false);
    const [actualUnit, setActualUnit] = useState<any>(null);

    const getNewIdForUnit = (array: any) => {
        if (array.length > 0) {
          const lastUnit = array[array.length - 1];
          return lastUnit.id + 1;
        } else {
          return array.length;
        }
      }
    
      const handleTitleChange = (e: any) => {
        setTitle(e.target.value)
      }
    
      const removeOption = (id: string) => {
        setUnits((prev: any) => {
          return prev.filter((actualPrevOption: any) => actualPrevOption.title.localeCompare(id) !== 0);
        });
      };
    
      const inputErrors = () => {
        const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
        return titleOutOfRange
      }
    
      const handleAddUnit = (unit: any) => {
        if (actualUnit) {
          setUnits((prev: any) => {
            for (let i = 0; i < prev.length; i++) {
              if (prev[i].id === actualUnit.id) {
                unit.id = actualUnit.id;
                prev[i] = unit;
              }
            }
    
            return prev;
          })
        } else {
          setUnits((prev: any) => {
            unit.id = getNewIdForUnit(prev);
            return [...prev, unit]
          })
        }
        //Go back to units screen
        setAddingUnit(false);
        //Go back to creation mode if you were editing a lesson
        setActualUnit(null)
      }

      const sendChallenge = () => {
        if (!inputErrors()) {
          props.handleSubmit({ "title": title, "units": units })
        } else {
          setShowError(true)
        }
      }

  return (
    <div>
      {!addingUnit && <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  style={{ marginTop: -10 }}
                  variant="h5"
                  gutterBottom>
                  Crear un nuevo desafío
                </Typography>
                <Box display="flex" sx={{ marginTop: 5 }}>
                  <TextField id="filled-basic" label="Titulo del desafío" variant="filled" value={title} onChange={handleTitleChange} />
                </Box>

                <Grid item xs={12} md={6}>
                  <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Unidades
                  </Typography>
                  <div>
                    {units.length < 1 &&
                      <Typography
                        style={{
                          width: 200,
                          fontSize: "14px",
                          marginLeft: "0px",
                          marginTop: 12
                        }}>
                        No has creado una unidad aún
                      </Typography>
                    }
                    {units.length > 0 && <List dense={true}>
                      {units.map((unit: any) => {
                        return (
                          <ListItem
                            key={unit.id}
                            sx={{
                              marginTop: 2,
                              width: 300,
                              marginLeft: -2
                            }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete" onClick={() => { removeOption(unit.title) }}>
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
                              primary={unit.title}
                            />
                            <IconButton onClick={() => {
                              setActualUnit(unit);
                              setAddingUnit(true);
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
                      marginLeft: "-8px"
                    }}
                    onClick={() => { 
                      setActualUnit(null);
                      setAddingUnit(true)
                    }}
                  >
                    Crear unidad
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
                    onClick={() => { sendChallenge() }}
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    Agregar
                  </ButtonCore>
                </Grid>
              </Grid>
            </Grid>}
            {addingUnit &&
              <UnitsAdd
                unit={actualUnit}
                setAddingUnit={setAddingUnit}
                handleSubmit={(unitCreated: any) => { handleAddUnit(unitCreated) }} />
            }

        <Alerts
            showError={showError}
            setShowError={setShowError}
          />
    </div>
  )
}