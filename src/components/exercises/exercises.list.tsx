import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  SelectInput,
  ChipField,
  TextInput,
  TopToolbar,
} from "react-admin";

const NoActions = () => <TopToolbar />;
const types = [
  { id: "listen", name: "listen" },
  { id: "complete", name: "complete" },
];
const filters = [
  <TextInput source="title" label="Titulo" alwaysOn variant="outlined" />,
  <TextInput source="sentence" label="Oracion" alwaysOn variant="outlined" />,
  <SelectInput
    source="type"
    label="Tipo"
    choices={types}
    alwaysOn
    variant="outlined"
  />,
];

export const ExercisesList = (props: any) => (
  <List {...props} filters={filters} actions={<NoActions />}>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Titulo" />
      <TextField source="sentence" label="Oracion" />
      <ChipField source="type" label="Tipo" />
      <EditButton />
    </Datagrid>
  </List>
);
