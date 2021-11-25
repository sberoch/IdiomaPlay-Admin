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

export const ChallengesCreate = (props: any) => {
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState<any[]>([]);
  const [addingUnit, setAddingUnit] = useState(false);
  let history = useHistory();

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
    console.log(unit)
    let currentUnits = units;
    currentUnits.push(unit);
    setUnits(currentUnits);
    setAddingUnit(false);
  }

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      const res = await api.post(config.challenges, {
        "title": title,
        "units": units
      });
      console.log(res);
      //Redirect
      history.push(config.challenges);
    } else {
      setShowError(true)
    }
  };

  return (
    <FormWithRedirect {...props}
      render={formProps => (
        <form>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              paddingLeft: 0,
              p: 1,
              m: 3,
            }}
          >
            {!addingUnit && <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography variant="h5" gutterBottom>Crear un nuevo desafío</Typography>
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
                            <IconButton onClick={() => { console.log("implementame rata") }}>
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
                    onClick={() => { setAddingUnit(true) }}
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
                    onClick={handleSubmit}
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    Agregar
                  </ButtonCore>
                </Grid>
              </Grid>
            </Grid>}
            {addingUnit &&
              <UnitsAdd handleSubmit={(unitCreated: any) => { handleAddUnit(unitCreated) }} />
            }
          </Box>
          <Alerts
            showError={showError}
            setShowError={setShowError}
          />
        </form>
      )}
    />
  )
};





// import { Box, Button, TextField, Typography } from "@material-ui/core";
// import SaveIcon from "@mui/icons-material/Save";
// import { useEffect, useState } from "react";
// import { ArrayInput, FormWithRedirect, SelectArrayInput } from "react-admin";
// import { useHistory } from "react-router-dom";
// import api from "../../api/axios";
// import { config } from "../../common/config";
// import Alerts from "../alerts/Alerts";

// export const ChallengesCreate = (props: any) => {
//   const [title, setTitle] = useState("");
//   const [units, setUnits] = useState([]);
//   const [unitsChosen, setUnitsChosen] = useState<string[]>([]);
//   const [showError, setShowError] = useState(false)
//   let history = useHistory();

//   useEffect(() => {
//     async function fetchLessons() {
//       const response = await api.get("units");
//       setUnits(response.data.items);
//       console.log(units);
//     }
//     fetchLessons();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const addUnitChosen = (event: any) => {
//     setUnitsChosen((prev) => {
//       console.log(event.target.value);
//       return event.target.value;
//     });
//   };

//   const handleTitleChange = (e: any) => {
//     setTitle(e.target.value);
//   };

//   const inputErrors = () => {
//     const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
//     const unitsIsEmpty = units.length === 0
//     const lessUnitsChosenThanAmountOfUnits = unitsChosen.length <= units.length
//     const noUnitsChosen = unitsChosen.length === 0; 

//     return titleOutOfRange || unitsIsEmpty || !lessUnitsChosenThanAmountOfUnits || noUnitsChosen
//   }

//   const handleSubmit = async () => {
//     //Postear al back
//     if (!inputErrors()) {
//       const res = await api.post(config.challenges, {
//         title,
//         unitsIds: unitsChosen.map((actual) => +actual),
//       });
//       console.log(res);
//       //Redirect
//       history.push(config.challenges);
//     } else {
//       setShowError(true);
//     }
//   };

//   return (
//     <FormWithRedirect
//       {...props}
//       render={(formProps) => (
//         // here starts the custom form layout
//         <form>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "flex-start",
//               flexDirection: "column",
//               p: 1,
//               m: 1,
//               paddingTop: 20,
//               paddingLeft: 20,
//             }}
//           >
//             <Box sx={{ paddingBottom: 35 }}>
//               <Typography variant="h6" gutterBottom>
//                 Crear un nuevo desafío
//               </Typography>
//             </Box>
//             <TextField
//               id="filled-basic"
//               label="Title"
//               variant="filled"
//               value={title}
//               onChange={handleTitleChange}
//             />
//             <Box sx={{ paddingTop: 35, minWidth: 220, width: "auto" }}>
//               <ArrayInput source="Desafíos">
//                 <SelectArrayInput
//                   choices={units}
//                   optionText="title"
//                   optionValue="id"
//                   variant="outlined"
//                   label="Elegí una unidad"
//                   onChange={addUnitChosen}
//                 />
//               </ArrayInput>
//             </Box>

//             <Alerts
//               showError={showError}
//               setShowError={setShowError}
//             />

//             <Button
//               style={{
//                 borderRadius: 35,
//                 backgroundColor: "lightBlue",
//                 padding: "18px 36px",
//                 fontSize: "18px",
//               }}
//               onClick={handleSubmit}
//               variant="contained"
//               startIcon={<SaveIcon />}
//             >
//               Agregar
//             </Button>
//           </Box>
//         </form>
//       )}
//     />
//   );
// };
