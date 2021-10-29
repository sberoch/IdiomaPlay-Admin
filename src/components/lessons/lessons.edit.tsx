import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const LessonsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
    </SimpleForm>
  </Edit>
);
