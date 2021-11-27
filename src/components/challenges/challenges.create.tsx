import { TextField } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
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
import React, { useState } from "react";
import { FormWithRedirect } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";
import { UnitsAdd } from "../units/units.add";

export const ChallengesCreate = (props: any) => {
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState<any[]>([]);
  const [addingUnit, setAddingUnit] = useState(false);
  const [actualUnit, setActualUnit] = useState<any>(null);
  let history = useHistory();

  const getNewIdForUnit = (array: any) => {
    if (array.length > 0) {
      const lastUnit = array[array.length - 1];
      return lastUnit.id + 1;
    } else {
      return array.length;
    }
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const removeOption = (id: string) => {
    setUnits((prev: any) => {
      return prev.filter(
        (actualPrevOption: any) =>
          actualPrevOption.title.localeCompare(id) !== 0
      );
    });
  };

  const inputErrors = () => {
    if (title.length > config.maxTitleLength) {
      setErrorText(
        `El título del desafío debe contener menos de ${config.maxTitleLength} caracteres`
      );
      return true;
    }
    if (title.length < config.minStringLength) {
      setErrorText(
        `El título del desafío debe contener al menos ${config.minStringLength} caracteres`
      );
      return true;
    }
    return false;
  };

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
      });
    } else {
      setUnits((prev: any) => {
        unit.id = getNewIdForUnit(prev);
        return [...prev, unit];
      });
    }
    //Go back to units screen
    setAddingUnit(false);
    //Go back to creation mode if you were editing a lesson
    setActualUnit(null);
  };

  const removeLocalIds = () => {
    for (let unit of units) {
      delete unit.id;
      for (let lesson of unit.lessons) {
        delete lesson.id;
        for (let exercise of lesson.exercises) {
          delete exercise.id;
        }
      }
    }
  };

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      removeLocalIds();
      const res = await api.post(config.challenges, {
        title: title,
        units: units,
      });
      console.log(res);
      //Redirect
      history.push("/challenges");
    } else {
      setShowError(true);
    }
  };

  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              paddingLeft: 0,
              p: 1,
              m: 3,
            }}
          >
            {!addingUnit && (
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Typography
                    style={{ marginTop: -10 }}
                    variant="h5"
                    gutterBottom
                  >
                    Crear un nuevo desafío
                  </Typography>
                  <Box display="flex" sx={{ marginTop: 5 }}>
                    <TextField
                      id="filled-basic"
                      label="Titulo del desafío"
                      variant="outlined"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </Box>

                  <Grid item xs={12} md={7}>
                    <Typography sx={{ mt: 6 }} variant="h6" component="div">
                      Unidades
                    </Typography>
                    <div>
                      {units.length < 1 && (
                        <Typography
                          style={{
                            width: 200,
                            fontSize: "14px",
                            marginLeft: "0px",
                            marginTop: 12,
                          }}
                        >
                          No has creado una unidad aún
                        </Typography>
                      )}
                      {units.length > 0 && (
                        <List dense={true}>
                          {units.map((unit: any) => {
                            return (
                              <ListItem
                                key={unit.id}
                                sx={{
                                  width: 300,
                                  marginLeft: -2,
                                }}
                                secondaryAction={
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => {
                                      removeOption(unit.title);
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                }
                              >
                                <ListItemText primary={unit.title} />
                                <IconButton
                                  onClick={() => {
                                    setActualUnit(unit);
                                    setAddingUnit(true);
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
                        marginLeft: "-8px",
                      }}
                      onClick={() => {
                        setActualUnit(null);
                        setAddingUnit(true);
                      }}
                      startIcon={<AddIcon />}
                    >
                      Agregar unidad
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleSubmit}
                      size="large"
                      sx={{ marginTop: 5 }}
                    >
                      Crear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {addingUnit && (
              <UnitsAdd
                unit={actualUnit}
                setAddingUnit={setAddingUnit}
                handleSubmit={(unitCreated: any) => {
                  handleAddUnit(unitCreated);
                }}
              />
            )}
          </Box>
          <Alerts
            showError={showError}
            setShowError={setShowError}
            errorText={errorText}
          />
        </form>
      )}
    />
  );
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
