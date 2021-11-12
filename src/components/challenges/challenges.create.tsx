import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { ArrayInput, FormWithRedirect, SelectArrayInput } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { consts } from "../../common/config";
import Alerts from "../alerts/Alerts";

export const ChallengesCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState([]);
  const [unitsChosen, setUnitsChosen] = useState<string[]>([]);
  const [showError, setShowError] = useState(false)
  let history = useHistory();

  useEffect(() => {
    async function fetchLessons() {
      const response = await api.get("units");
      setUnits(response.data.items);
      console.log(units);
    }
    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUnitChosen = (event: any) => {
    setUnitsChosen((prev) => {
      console.log(event.target.value);
      return event.target.value;
    });
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const inputErrors = () => {
    const titleOutOfRange = title.length > consts.maxTitleLength || title.length < consts.minStringLength
    const unitsIsEmpty = units.length === 0
    const lessUnitsChosenThanAmountOfUnits = unitsChosen.length <= units.length
    const noUnitsChosen = unitsChosen.length === 0; 

    return titleOutOfRange || unitsIsEmpty || !lessUnitsChosenThanAmountOfUnits || noUnitsChosen
  }

  const handleSubmit = async () => {
    //Postear al back
    if (!inputErrors()) {
      const res = await api.post("/challenges", {
        title,
        unitsIds: unitsChosen.map((actual) => +actual),
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
                Crear un nuevo desafío
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
              <ArrayInput source="Desafíos">
                <SelectArrayInput
                  choices={units}
                  optionText="title"
                  optionValue="id"
                  variant="outlined"
                  label="Elegí una unidad"
                  onChange={addUnitChosen}
                />
              </ArrayInput>
            </Box>

            <Alerts
              showError={showError}
              setShowError={setShowError}
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
