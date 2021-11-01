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
      <TextInput disabled source="id" variant="outlined" />
      <TextInput source="title" variant="outlined" />
      <NumberInput source="examTimeInSeconds" variant="outlined" />
    </SimpleForm>
  </Edit>
);
