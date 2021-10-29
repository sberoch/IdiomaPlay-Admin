import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  NumberField,
} from "react-admin";

export const ExamsList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <NumberField source="examTimeInSeconds" />
      <EditButton />
    </Datagrid>
  </List>
);
