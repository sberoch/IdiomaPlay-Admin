import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  NumberField,
} from "react-admin";

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <NumberField source="points" label="Puntos" />
    </Datagrid>
  </List>
);
