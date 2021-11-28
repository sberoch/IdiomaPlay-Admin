import * as React from "react";
import {
  Datagrid,
  List,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

const NoActions = () => <TopToolbar></TopToolbar>;
const filters = [
  <TextInput source="title" label="Buscar" alwaysOn variant="outlined" />,
  <ReferenceInput
    source="unit.id"
    label="Unidad"
    reference="units"
    alwaysOn
    variant="outlined"
  >
    <SelectInput optionText="title" variant="outlined" />
  </ReferenceInput>,
];

export const LessonsList = (props: any) => (
  <List
    {...props}
    filters={filters}
    actions={<NoActions />}
    bulkActionButtons={false}
  >
    <Datagrid rowClick="edit">
      <TextField source="title" label="Titulo" />
    </Datagrid>
  </List>
);
