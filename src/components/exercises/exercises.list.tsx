import * as React from "react";
import { List, Datagrid, TextField, EditButton, ChipField } from "react-admin";

export const ExercisesList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Titulo" />
      <TextField source="sentence" label="Oracion" />
      <ChipField source="type" label="Tipo" />
      <EditButton />
    </Datagrid>
  </List>
);
