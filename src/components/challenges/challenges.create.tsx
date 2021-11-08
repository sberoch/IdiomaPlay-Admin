import { Box, Button, TextField, Typography } from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from "react";
import {
  ArrayInput, FormWithRedirect, SelectArrayInput
} from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";


export const ChallengesCreate = (props: any) => {
  const [title, setTitle] = useState("");
  const [units, setUnits] = useState([]);
  const [unitsChosen, setUnitsChosen] = useState<string[]>([])
  let history = useHistory();

  useEffect(() => {
    async function fetchLessons() {
      const response = await api.get('units');
      setUnits(response.data.items)
      console.log(units)
    }
    fetchLessons();
  }, [])

  const addUnitChosen = (event: any) => {
    setUnitsChosen((prev) => {
      console.log(event.target.value)
      return event.target.value
    })
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }


  const handleSubmit = async () => {
    //Postear al back
    const res = await api.post('/challenges', {
      title,
      unitsIds: unitsChosen.map(actual => +actual)
    })
    console.log(res);
    //Redirect
    history.push("/challenges");
  }

  return (
    <FormWithRedirect {...props}
      render={formProps => (
        // here starts the custom form layout
        <form>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              p: 1,
              m: 1,
              paddingTop: 20,
              paddingLeft: 20
            }}
          >
            <Box sx={{ paddingBottom: 35  }}>
              <Typography variant="h6" gutterBottom>Crear un nuevo desafío</Typography>
            </Box>
            <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={handleTitleChange} />
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
            <Button
              style={{
                borderRadius: 35,
                backgroundColor: "lightBlue",
                padding: "18px 36px",
                fontSize: "18px"
              }}
              onClick={handleSubmit}
              variant="contained"
              startIcon={<SaveIcon />} >
              Agregar
            </Button>

          </Box>
        </form>
      )}
    />
  )
}
