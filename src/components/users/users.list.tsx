import * as React from "react";
import {
  TopToolbar,
  Datagrid,
  EmailField,
  List,
  NumberField,
  TextInput,
  DeleteButton,
} from "react-admin";

const NoActions = () => <TopToolbar />;

const filters = [
  <TextInput source="email" label="Buscar" alwaysOn variant="outlined" />,
];

export const UserList = (props: any) => (
  <List
    filters={filters}
    {...props}
    actions={<NoActions />}
    bulkActionButtons={false}
  >
    <Datagrid rowClick="edit">
      <EmailField source="email" />
      <NumberField source="points" label="Puntos" />
      <DeleteButton />
    </Datagrid>
  </List>
);
