import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import api from "../../api/axios";

export const DisableCheckbox = (props: any) => {
  const [checked, setChecked] = useState(props.record.enabled);

  const handleChange = async (e: any) => {
    setChecked(!checked);
    e.stopPropagation();
    await api.post(`/challenges/${props.record.id}/enableOrDisable`);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            defaultChecked={props.record.enabled}
            onClick={handleChange}
            sx={{
              "&.Mui-checked": {
                color: "#3da6c7",
              },
            }}
          />
        }
        label={checked ? "Habilitado" : "Deshabilitado"}
        sx={{ color: "#3da6c7" }}
      />
    </FormGroup>
  );
};
