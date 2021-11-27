import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { ArrayInput, FormWithRedirect, SelectArrayInput } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";

export const LessonsCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercisesChosen, setExercisesChosen] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  let history = useHistory();

  useEffect(() => {
    async function fetchExercises() {
      const response = await api.get(config.exercises);
      setExercises(response.data.items);
      console.log(exercises);
    }
    fetchExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addExerciseChosen = (event: any) => {
    setExercisesChosen((prev) => {
      console.log(event.target.value);
      return event.target.value;
    });
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const inputErrors = () => {
    const titleOutOfRange =
      title.length > config.maxTitleLength ||
      title.length < config.minStringLength;
    const exercisesIsEmpty = exercises.length === 0;
    const lessExercisesChosenThanAmountOfExercises =
      exercisesChosen.length <= exercises.length;
    const noExercisesChosen = exercisesChosen.length === 0;

    return (
      titleOutOfRange ||
      exercisesIsEmpty ||
      !lessExercisesChosenThanAmountOfExercises ||
      noExercisesChosen
    );
  };

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      const res = await api.post(config.lessons, {
        title,
        exercisesIds: exercisesChosen.map((actual) => +actual),
      });
      console.log(res);
      //Redirect
      history.push("/lessons");
    } else {
      setShowError(true);
    }
  };

  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        // here starts the custom form layout
        <form>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              p: 1,
              m: 1,
              paddingTop: 20,
              paddingLeft: 20,
            }}
          >
            <Box sx={{ paddingBottom: 35 }}>
              <Typography variant="h6" gutterBottom>
                Crear nueva leccion
              </Typography>
            </Box>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              value={title}
              onChange={handleTitleChange}
            />
            <Box sx={{ paddingTop: 50, minWidth: 220, width: "auto" }}>
              <ArrayInput source="Ejercicios">
                <SelectArrayInput
                  choices={exercises}
                  optionText={"sentence"}
                  optionValue="id"
                  variant="outlined"
                  label="Elegí un ejercicio"
                  onChange={addExerciseChosen}
                />
              </ArrayInput>
            </Box>

            <Alerts
              showError={showError}
              setShowError={setShowError}
              errorText={""}
            />

            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "lightBlue",
                padding: "18px 36px",
                fontSize: "18px",
              }}
              onClick={handleSubmit}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Agregar
            </Button>
          </Box>
        </form>
      )}
    />
  );
};
