import * as React from "react";
import {
  Datagrid,
  Identifier,
  List,
  ReferenceInput,
  RowClickFunction,
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

export const LessonsList = (props: any) => {
  const onRowClick: RowClickFunction = (
    basePath: Identifier,
    id: string,
    data: any
  ) => {
    return `/exercises?filter=${JSON.stringify({ lesson: data.id })}`;
  } 
  return (
    <List
      {...props}
      filters={filters}
      actions={<NoActions />}
      bulkActionButtons={false}
    >
      <Datagrid rowClick={onRowClick}>
        <TextField source="title" label="Título" />
      </Datagrid>
    </List>
  )
};
