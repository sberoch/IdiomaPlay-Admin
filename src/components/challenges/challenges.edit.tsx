import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const ChallengesEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
    </SimpleForm>
  </Edit>
);
