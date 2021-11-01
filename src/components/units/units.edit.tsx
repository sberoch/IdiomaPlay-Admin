import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const UnitsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" variant="outlined" />
      <TextInput source="title" variant="outlined" />
    </SimpleForm>
  </Edit>
);
