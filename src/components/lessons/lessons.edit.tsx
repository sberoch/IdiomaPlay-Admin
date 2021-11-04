import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const LessonsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" variant="outlined" />
      <TextInput source="title" variant="outlined" label="Titulo" />
    </SimpleForm>
  </Edit>
);
