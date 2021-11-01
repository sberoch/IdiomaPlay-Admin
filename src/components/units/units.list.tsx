import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const UnitsList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" label="Titulo" />
      <EditButton />
    </Datagrid>
  </List>
);
