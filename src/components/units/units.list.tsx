import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  TextInput,
  ReferenceInput,
  SelectInput,
  RowClickFunction,
  Identifier,
  CreateButton,
  DeleteButton,
} from "react-admin";

const NoActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const filters = [
  <TextInput source="title" label="Buscar" alwaysOn variant="outlined" />,
  <ReferenceInput
    source="challenge.id"
    label="Desafio"
    reference="challenges"
    alwaysOn
    variant="outlined"
  >
    <SelectInput optionText="title" />
  </ReferenceInput>,
];

export const UnitsList = (props: any) => {
  const onRowClick: RowClickFunction = (
    basePath: Identifier,
    id: string,
    data: any
  ) => `/lessons?filter=${JSON.stringify({ unit: data })}`;
  return (
    <List
      {...props}
      filters={filters}
      actions={<NoActions />}
      bulkActionButtons={false}
    >
      <Datagrid rowClick={onRowClick}>
        <TextField source="title" label="Titulo" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
