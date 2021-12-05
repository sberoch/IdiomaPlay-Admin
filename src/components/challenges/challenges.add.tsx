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
import React, { useEffect, useState } from "react";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";
import { UnitsAdd } from "../units/units.add";

export const ChallengesAdd = (props: any) => {
  const { challenge } = props;
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState<any[]>([]);
  const [addingUnit, setAddingUnit] = useState(false);
  const [actualUnit, setActualUnit] = useState<any>(null);

  useEffect(() => {
    if (challenge) {
      setTitle((prev) => challenge.title);
      setUnits((prev) => challenge.units);
    }
  }, [challenge]);

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
    console.log(unit);
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

  const sendChallenge = () => {
    if (!inputErrors()) {
      props.handleSubmit({ title: title, units: units });
    } else {
      setShowError(true);
    }
  };

  const getAddOrSaveButton = () => {
    if (challenge) {
      return "Guardar";
    } else {
      return "Crear";
    }
  };

  return (
    <div>
      {!addingUnit && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography style={{ marginTop: -10 }} variant="h5" gutterBottom>
              {challenge? "Editar desafío" : "Crear un nuevo desafío"}
            </Typography>
            <Box display="flex" sx={{ marginTop: 5 }}>
              <TextField
                id="filled-basic"
                label="Título del desafío"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
              />
            </Box>

            <Grid item xs={12} md={10}>
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
                  color: "#3da6c7"
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
                style={{backgroundColor: "#3da6c7"}}
                variant="contained"
                fullWidth
                onClick={() => sendChallenge()}
                size="large"
                sx={{ marginTop: 5 }}
              >
                {getAddOrSaveButton()}
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

      <Alerts
        showError={showError}
        setShowError={setShowError}
        errorText={errorText}
      />
    </div>
  );
};
