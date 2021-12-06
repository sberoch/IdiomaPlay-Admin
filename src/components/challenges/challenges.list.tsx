import * as React from "react";
import {
  CreateButton,
  Datagrid,
  EditButton,
  Identifier,
  List,
  RowClickFunction,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import { DisableCheckbox } from "./disableCheckbox";

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
    <div>
      <List
        {...props}
        filters={filters}
        actions={<NoActions />}
        bulkActionButtons={false}
      >
        <Datagrid rowClick={onRowClick}>
          <TextField source="title" label="Título" />
          <EditButton />
          <DisableCheckbox />
        </Datagrid>
      </List>
    </div>
  );
};
