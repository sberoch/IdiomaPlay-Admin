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
import { ChallengesAdd } from './challenges.add';

export const ChallengesCreate = (props: any) => {
  let history = useHistory();

  const removeLocalIds = (challenge: any) => {
    for (let unit of challenge.units) {
      delete unit.id;
      for (let lesson of unit.lessons) {
        delete lesson.id;
        for (let exercise of lesson.exercises) {
          delete exercise.id;
        }
      }
    }
    return challenge;
  }

  const handleSubmit = async (challenge: any) => {
    //Postear al back{
    challenge = removeLocalIds(challenge);
    const res = await api.post(config.challenges, {
      "title": challenge.title,
      "units": challenge.units
    });
    console.log(res);
    //Redirect
    history.push("/challenges");
  }

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
            <ChallengesAdd
              handleSubmit={(unitCreated: any) => { handleSubmit(unitCreated) }}/>
          </Box>
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
