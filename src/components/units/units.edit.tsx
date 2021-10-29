import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const UnitsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
    </SimpleForm>
  </Edit>
);
