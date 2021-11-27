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

export const ChallengesEdit = (props: any) => {
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
    const res = await api.patch('challenges/'+props.id, {
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
          <a onClick={()=>{console.log(props)}}>VER PROPS</a>
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




// import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

// export const ChallengesEdit = (props: EditProps) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" variant="outlined" />
//       <TextInput source="title" variant="outlined" label="Titulo" />
//     </SimpleForm>
//   </Edit>
// );
