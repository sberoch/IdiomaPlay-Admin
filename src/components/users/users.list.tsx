import * as React from "react";
import {
  TopToolbar,
  Datagrid,
  EmailField,
  List,
  NumberField,
  TextInput,
} from "react-admin";

const NoActions = () => <TopToolbar />;

const filters = [
  <TextInput source="email" label="Buscar" alwaysOn variant="outlined" />,
];

export const UserList = (props: any) => (
  <List filters={filters} {...props} actions={<NoActions />}>
    <Datagrid rowClick="edit">
      <EmailField source="email" />
      <NumberField source="points" label="Puntos" />
    </Datagrid>
  </List>
);
