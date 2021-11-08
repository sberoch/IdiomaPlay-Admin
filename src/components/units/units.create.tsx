import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { ArrayInput, FormWithRedirect, SelectArrayInput } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";

export const UnitsCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonsChosen, setLessonsChosen] = useState<string[]>([]);
  let history = useHistory();

  useEffect(() => {
    async function fetchLessons() {
      const response = await api.get("lessons");
      setLessons(response.data.items);
      console.log(lessons);
    }
    fetchLessons();
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

  const handleSubmit = async () => {
    //Postear al back
    const res = await api.post("/units", {
      title,
      lessonsIds: lessonsChosen.map((actual) => +actual),
    });
    console.log(res);
    //Redirect
    history.push("/units");
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
