import { Button as ButtonCore, Container, FormHelperText, IconButton, MenuItem, TextField } from '@material-ui/core';
import { Select } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { config } from '../../common/config';
import Alerts from '../alerts/Alerts';
import AddExerciseList from './AddExerciseList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");
  const [type, setType] = useState("")
  const [options, setOptions] = useState<Option[]>([]);
  const [correctOption, setCorrectOption] = useState<string>("");

  useEffect(() => {
    if (exercise) {
      setTitle((prev) => exercise.title);
      setSentence((prev) => exercise.sentence);
      setType((prev) => exercise.type);
      setOptions((prev) => exercise.options);
      setCorrectOption((prev) => exercise.correctOption);
    }
  }, [exercise])

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const handleSentenceChange = (e: any) => {
    setSentence(e.target.value)
  }

  const handleTypeChange = (e: any) => {
    setType(e.target.value)
    if (e.target.value === types.complete.text && options.length > types.complete.amount) {
      setOptions((prev: any) => prev.slice(0, types.complete.amount))
    }
  }

  const inputErrors = () => {
    const amoutOfOptions = type === types.complete.text ? types.complete.amount : types.listen.amount
    const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
    const sentenceOutOfRange = sentence.length < config.minStringLength;
    const sentenceDoesntContainAsterik = type === types.complete.text && !sentence.includes("*");
    const notEnoughOptions = options.length !== amoutOfOptions
    const correctOptionIsEmpty = correctOption === ""
    const correctOptionIsInOptions = options.some((actualOption: Option) => actualOption.text === correctOption)

    return titleOutOfRange || sentenceOutOfRange || sentenceDoesntContainAsterik ||
      notEnoughOptions || correctOptionIsEmpty ||
      !correctOptionIsInOptions
  }

  const sendExercise = () => {
    if (!inputErrors()) {
      props.handleSubmit({ title, sentence, type, options, correctOption })
    } else {
      setShowError(true)
    }
  }

  const getHelpText = () => {
    switch (type) {
      case types.complete.text:
        return "The house * on fire, donde el * indica donde se reemplaza la opción correcta."
      case types.translate_new_to_old.text:
        return "Ingrese la oración a ser traducida."
      case types.translate_old_to_new.text:
        return "Ingrese la oración a ser traducida."
      case types.listen.text:
        return "Ingrese la oración a ser escuchada en la aplicación."
    }
  }

  const getLength = () => {
    return type ? 6 : 12;
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={getLength()}>
          <IconButton
            style={{
              marginLeft: -70,
              marginTop: -40,
              marginBottom: -10
            }}
            onClick={() => { props.setAddingExercise(false) }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            style={{
              marginTop: -38
            }}
            variant="h6"
            gutterBottom>
            Crear ejercicio
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <TextField id="filled-basic" label="Titulo del ejercicio" variant="filled" value={title} onChange={handleTitleChange} />
          </Box>


          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" gutterBottom>Agregar tipo de ejercicio</Typography>
          </Box>

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Tipo de ejercicio"
            onChange={handleTypeChange}
            defaultValue="None"
            value={type}
            sx={{ marginTop: 1, p: 1, width: 200 }}
          >
            {exerciseTypes.map((actualType) => {
              return (
                <MenuItem key={actualType.id} value={actualType.name}>
                  {actualType.name}
                </MenuItem>
              );
            })}
          </Select>

          <Box sx={{ marginTop: 6 }}>
            <Typography variant="h6" gutterBottom>Agregar oración</Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Grid id="top-row" container spacing={3}>
              <Grid item xs={10}>
                <TextField id="filled-basic" label="Oración" variant="filled" value={sentence} onChange={handleSentenceChange} />
              </Grid>
              <Grid item xs={10}>
                <FormHelperText>{getHelpText()}</FormHelperText>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={6}>
          {type &&
            <Box sx={{
              marginTop: -2,
            }}>
              <Typography variant="h6" gutterBottom>Agregar opciones</Typography>
              <Box sx={{ marginTop: 0 }}>
                <AddExerciseList
                  type={type}
                  options={options}
                  setOptions={setOptions}
                  correctOption={correctOption}
                  setCorrectOption={setCorrectOption}
                />
              </Box>

              <ButtonCore
                style={{
                  borderRadius: 35,
                  backgroundColor: "lightBlue",
                  padding: "18px 36px",
                  fontSize: "18px",
                  marginTop: "60px",
                  marginLeft: "-5px"
                }}
                onClick={() => { sendExercise() }}
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Agregar
              </ButtonCore>

            </Box>
          }
        </Grid>
      </Grid>

      <Alerts
        showError={showError}
        setShowError={setShowError}
      />
    </Container>
  )
}