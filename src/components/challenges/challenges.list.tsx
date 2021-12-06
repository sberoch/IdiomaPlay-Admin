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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps }  from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NoActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);
const filters = [
  <TextInput source="title" label="Buscar" alwaysOn variant="outlined" />,
];

export const ChallengesList = (props: any) => {
  const [alertOpened, setAlertOpened] = React.useState(true);
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

      <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={alertOpened} autoHideDuration={3000} onClose={() => {setAlertOpened(false)}}>
        <Alert severity="success">Desafío creado correctamente!</Alert>
      </Snackbar>
    </div>
  );
};
