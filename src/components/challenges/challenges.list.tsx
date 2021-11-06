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
} from "react-admin";

const NoActions = () => <TopToolbar />;
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
    <List {...props} filters={filters} actions={<NoActions />}>
      <Datagrid rowClick={onRowClick}>
        <TextField source="title" label="Titulo" />
        <EditButton />
      </Datagrid>
    </List>
  );
};
