import * as React from "react";
import { List, Datagrid, TextField, EmailField, UrlField } from "react-admin";

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="phone" />
      <UrlField source="website" />
    </Datagrid>
  </List>
);
