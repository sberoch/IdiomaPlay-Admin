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
import { UnitsEdit } from './units.edit';

export const UnitsCreate = (props: any) => {
  const [showError, setShowError] = useState(false);
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
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const removeOption = (id: string) => {
    setUnits((prev: any) => {
      return prev.filter((actualPrevOption: any) => actualPrevOption.title.localeCompare(id) !== 0);
    });
  };

  const inputErrors = () => {
    const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
    return titleOutOfRange
  }

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
      })
    } else {
      setUnits((prev: any) => {
        unit.id = getNewIdForUnit(prev);
        return [...prev, unit]
      })
    }
    //Go back to units screen
    setAddingUnit(false);
    //Go back to creation mode if you were editing a lesson
    setActualUnit(null)
  }


  const removeLocalIds = (unit: any) => {
    delete unit.id
    for (let lesson of unit.lessons) {
      delete lesson.id;
      for (let exercise of lesson.exercises) {
        delete exercise.id;
      }
    }
    return unit
  }

  const handleSubmit = async (unit: any) => {
    //Postear al back
    console.log(unit)
    unit = removeLocalIds(unit);
    const res = await api.post(config.units, {
      unit
    });
    console.log(res);
    //Redirect
    history.push("/units");
  };

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
            <UnitsAdd 
                setAddingUnit={setAddingUnit}
                handleSubmit={(unitCreated: any) => { handleSubmit(unitCreated) }} />
          </Box>
          <Alerts
            showError={showError}
            setShowError={setShowError}
          />
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

// export const UnitsCreate = (props: any) => {
//   const [title, setTitle] = useState("");
//   const [lessons, setLessons] = useState([]);
//   const [lessonsChosen, setLessonsChosen] = useState<string[]>([]);
//   const [showError, setShowError] = useState(false)
//   let history = useHistory();

//   useEffect(() => {
//     async function fetchLessons() {
//       const response = await api.get(config.lessons);
//       setLessons(response.data.items);
//       console.log(lessons);
//     }
//     fetchLessons();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const addLessonChosen = (event: any) => {
//     setLessonsChosen((prev) => {
//       console.log(event.target.value);
//       return event.target.value;
//     });
//   };

//   const handleTitleChange = (e: any) => {
//     setTitle(e.target.value);
//   };

//   const inputErrors = () => {
//     const titleOutOfRange = title.length > config.maxTitleLength || title.length < config.minStringLength
//     const lessonsIsEmpty = lessons.length === 0
//     const lessLessonsChosenThanAmountOfLessons = lessonsChosen.length <= lessons.length
//     const noLessonsChosen = lessonsChosen.length === 0; 

//     return titleOutOfRange || lessonsIsEmpty || !lessLessonsChosenThanAmountOfLessons || noLessonsChosen
//   }

//   const handleSubmit = async () => {
//     //Postear al back
//     if (!inputErrors()) {
//       const res = await api.post(config.units, {
//         title,
//         lessonsIds: lessonsChosen.map((actual) => +actual),
//       });
//       console.log(res);
//       //Redirect
//       history.push("/units");
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
//                 Crear nueva unidad
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
//               <ArrayInput source="Lecciones">
//                 <SelectArrayInput
//                   choices={lessons}
//                   optionText="title"
//                   optionValue="id"
//                   variant="outlined"
//                   label="Elegí una leccion"
//                   onChange={addLessonChosen}
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
