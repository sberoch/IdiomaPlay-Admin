import {
  Edit,
  SimpleForm,
  TextInput,
  EditProps,
  NumberInput,
} from "react-admin";

export const ExamsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" />
      <NumberInput source="examTimeInSeconds" />
    </SimpleForm>
  </Edit>
);
