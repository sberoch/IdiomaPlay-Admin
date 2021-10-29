import * as React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";

export const LessonsList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);
