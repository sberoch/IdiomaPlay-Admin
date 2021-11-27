import {
  Container,
  FormHelperText,
  IconButton,
  MenuItem,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";
import AddExerciseList from "./AddExerciseList";

const exerciseTypes = [
  { id: "complete", name: "complete" },
  { id: "listen", name: "listen" },
  { id: "translate_old_to_new", name: "translate_old_to_new" },
  { id: "translate_new_to_old", name: "translate_new_to_old" },
];

const types = {
  complete: { text: "complete", amount: 4 },
  listen: { text: "listen", amount: 6 },
  translate_old_to_new: { text: "translate_old_to_new", amount: 6 },
  translate_new_to_old: { text: "translate_new_to_old", amount: 6 },
};

interface Option {
  id: number;
  text: string;
}

export const ExercisesAdd = (props: any) => {
  const { exercise } = props;
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [correctOption, setCorrectOption] = useState<string>("");

  useEffect(() => {
    if (exercise) {
      setTitle(exercise.title);
      setSentence(exercise.sentence);
      setType(exercise.type);
      setOptions(exercise.options);
      setCorrectOption(exercise.correctOption);
    }
  }, [exercise]);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleSentenceChange = (e: any) => {
    setSentence(e.target.value);
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
    if (
      e.target.value === types.complete.text &&
      options.length > types.complete.amount
    ) {
      setOptions((prev: any) => prev.slice(0, types.complete.amount));
    }
  };

  const inputErrors = () => {
    const amoutOfOptions =
      type === types.complete.text
        ? types.complete.amount
        : types.listen.amount;

    if (title.length > config.maxTitleLength) {
      setErrorText(
        `El título del ejercicio debe contener menos de ${config.maxTitleLength} caracteres`
      );
      return true;
    }
    if (title.length < config.minStringLength) {
      setErrorText(
        `El título del ejercicio debe contener al menos ${config.minStringLength} caracteres`
      );
      return true;
    }
    if (options.length !== amoutOfOptions) {
      setErrorText(`Se requieren ${amoutOfOptions} opciones`);
      return true;
    }
    if (sentence.length < config.minStringLength) {
      setErrorText(
        `El la oracion del ejercicio debe contener al menos ${config.minStringLength} caracteres`
      );
      return true;
    }
    if (type === types.complete.text && !sentence.includes("*")) {
      setErrorText(
        "La oracion debe incluir un * para indicar el espacio a completar"
      );
      return true;
    }
    if (correctOption === "") {
      setErrorText(`Se requiere la opcion correcta`);
      return true;
    }
    if (!options.some((o: Option) => o.text === correctOption)) {
      setErrorText(
        `La opcion correcta seleccionada debe permanecer a las opciones posibles`
      );
      return true;
    }
    return false;
  };

  const sendExercise = () => {
    if (!inputErrors()) {
      props.handleSubmit({ title, sentence, type, options, correctOption });
    } else {
      setShowError(true);
    }
  };

  const getHelpText = () => {
    switch (type) {
      case types.complete.text:
        return "The house * on fire, donde el * indica donde se reemplaza la opción correcta.";
      case types.translate_new_to_old.text:
        return "Ingrese la oración a ser traducida.";
      case types.translate_old_to_new.text:
        return "Ingrese la oración a ser traducida.";
      case types.listen.text:
        return "Ingrese la oración a ser escuchada en la aplicación.";
    }
  };

  const getLength = () => {
    return type ? 6 : 12;
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={getLength()}>
          <IconButton
            style={{
              marginLeft: -70,
              marginTop: -30,
              marginBottom: -10,
            }}
            onClick={() => {
              props.setAddingExercise(false);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            style={{
              marginTop: -32,
            }}
            variant="h5"
            gutterBottom
          >
            Crear ejercicio
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <TextField
              id="filled-basic"
              label="Titulo del ejercicio"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
            />
          </Box>

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" fontSize="11pt" gutterBottom>
              Agregar tipo de ejercicio
            </Typography>
          </Box>
          <Select
            labelId="label"
            label="Tipo de ejercicio"
            onChange={handleTypeChange}
            value={type}
            sx={{ width: 230 }}
          >
            {exerciseTypes.map((actualType) => {
              return (
                <MenuItem key={actualType.id} value={actualType.name}>
                  {actualType.name}
                </MenuItem>
              );
            })}
          </Select>

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" fontSize="11pt" gutterBottom>
              Agregar oración
            </Typography>
          </Box>

          <Box>
            <Grid id="top-row" container spacing={3}>
              <Grid item xs={10}>
                <TextField
                  id="filled-basic"
                  label="Oración"
                  multiline
                  variant="outlined"
                  value={sentence}
                  onChange={handleSentenceChange}
                />
              </Grid>
              <Grid item xs={10}>
                <FormHelperText>{getHelpText()}</FormHelperText>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6}>
          {type && (
            <Box
              sx={{
                marginTop: 0,
              }}
            >
              <Typography variant="h6" fontSize="11pt" gutterBottom>
                Agregar opciones
              </Typography>
              <Box>
                <AddExerciseList
                  type={type}
                  options={options}
                  setOptions={setOptions}
                  correctOption={correctOption}
                  setCorrectOption={setCorrectOption}
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  sendExercise();
                }}
                size="large"
                sx={{ marginTop: 5 }}
              >
                Crear
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <Alerts
        showError={showError}
        setShowError={setShowError}
        errorText={errorText}
      />
    </Container>
  );
};
