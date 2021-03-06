import * as React from "react";
import {
  ChipField,
  Datagrid,
  List,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

const NoActions = () => <TopToolbar></TopToolbar>;

const types = [
  { id: "listen", name: "listen" },
  { id: "complete", name: "complete" },
  { id: "translate_old_to_new", name: "translate_old_to_new" },
  { id: "translate_new_to_old", name: "translate_new_to_old" },
];
const filters = [
  <TextInput source="title" label="Título" alwaysOn variant="outlined" />,
  <TextInput source="sentence" label="Oración" alwaysOn variant="outlined" />,
  <SelectInput
    source="type"
    label="Tipo"
    choices={types}
    alwaysOn
    variant="outlined"
  />,
];

export const ExercisesList = (props: any) => (
  <List
    {...props}
    filters={filters}
    actions={<NoActions />}
    bulkActionButtons={false}
  >
    <Datagrid rowClick="edit">
      <TextField source="title" label="Título" />
      <TextField source="sentence" label="Oración" />
      <ChipField source="type" label="Tipo" />
    </Datagrid>
  </List>
);
