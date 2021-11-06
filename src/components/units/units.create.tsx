import { Create, SimpleForm, TextInput, CreateProps } from "react-admin";

export const UnitsCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" variant="outlined" label="Titulo" />
    </SimpleForm>
  </Create>
);
