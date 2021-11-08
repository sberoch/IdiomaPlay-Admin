import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  TopToolbar,
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
];

export const ChallengesList = (props: any) => {
  const onRowClick: RowClickFunction = (
    basePath: Identifier,
    id: string,
    data: any
  ) => `/units?filter=${JSON.stringify({ challenge: data })}`;

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
