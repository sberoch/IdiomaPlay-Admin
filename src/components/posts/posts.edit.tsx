import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  EditProps,
} from "react-admin";

export const PostEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput multiline source="body" />
    </SimpleForm>
  </Edit>
);
