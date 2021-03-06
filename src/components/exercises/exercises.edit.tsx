import {
  Edit,
  SimpleForm,
  TextInput,
  EditProps,
  SelectInput,
} from "react-admin";

export const ExercisesEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" variant="outlined" />
      <TextInput source="title" variant="outlined" label="Titulo" />
      <TextInput source="sentence" variant="outlined" label="Oracion" />
      <SelectInput
        source="type"
        variant="outlined"
        label="Tipo"
        choices={[
          { id: "complete", name: "complete" },
          { id: "listen", name: "listen" },
          { id: "translate_old_to_new", name: "translate_old_to_new" },
          { id: "translate_new_to_old", name: "translate_new_to_old" },
        ]}
      />
    </SimpleForm>
  </Edit>
);
