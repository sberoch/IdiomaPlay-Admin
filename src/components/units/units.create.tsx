import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { ArrayInput, FormWithRedirect, SelectArrayInput } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";

export const UnitsCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonsChosen, setLessonsChosen] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  let history = useHistory();

  useEffect(() => {
    async function fetchLessons() {
      const response = await api.get(config.lessons);
      setLessons(response.data.items);
      console.log(lessons);
    }
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addLessonChosen = (event: any) => {
    setLessonsChosen((prev) => {
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
    const lessonsIsEmpty = lessons.length === 0;
    const lessLessonsChosenThanAmountOfLessons =
      lessonsChosen.length <= lessons.length;
    const noLessonsChosen = lessonsChosen.length === 0;

    return (
      titleOutOfRange ||
      lessonsIsEmpty ||
      !lessLessonsChosenThanAmountOfLessons ||
      noLessonsChosen
    );
  };

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      const res = await api.post(config.units, {
        title,
        lessonsIds: lessonsChosen.map((actual) => +actual),
      });
      console.log(res);
      //Redirect
      history.push("/units");
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
                Crear nueva unidad
              </Typography>
            </Box>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
              value={title}
              onChange={handleTitleChange}
            />
            <Box sx={{ paddingTop: 35, minWidth: 220, width: "auto" }}>
              <ArrayInput source="Lecciones">
                <SelectArrayInput
                  choices={lessons}
                  optionText="title"
                  optionValue="id"
                  variant="outlined"
                  label="Elegí una leccion"
                  onChange={addLessonChosen}
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
