import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

export const UnitsEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" variant="outlined" />
      <TextInput source="title" variant="outlined" label="Titulo" />
      <TextInput
        source="exam.title"
        variant="outlined"
        label="Titulo del examen"
      />
      <TextInput
        source="exam.examTimeInSeconds"
        variant="outlined"
        label="Tiempo del examen (s)"
      />
    </SimpleForm>
  </Edit>
);
