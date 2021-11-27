import Box from "@mui/material/Box";
import React, { useState } from "react";
import { FormWithRedirect } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { config } from "../../common/config";
import Alerts from "../alerts/Alerts";
import { UnitsAdd } from "../units/units.add";

export const UnitsCreate = (props: any) => {
  const [showError, setShowError] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addingUnit, setAddingUnit] = useState(false);
  let history = useHistory();

  const removeLocalIds = (unit: any) => {
    delete unit.id;
    for (let lesson of unit.lessons) {
      delete lesson.id;
      for (let exercise of lesson.exercises) {
        delete exercise.id;
      }
    }
    return unit;
  };

  const handleSubmit = async (unit: any) => {
    //Postear al back
    console.log(unit);
    unit = removeLocalIds(unit);
    const res = await api.post(config.units, {
      unit,
    });
    console.log(res);
    //Redirect
    history.push("/units");
  };

  return (
    <FormWithRedirect
      {...props}
      render={(formProps) => (
        <form>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              paddingLeft: 0,
              p: 1,
              m: 3,
            }}
          >
            <UnitsAdd
              setAddingUnit={setAddingUnit}
              handleSubmit={(unitCreated: any) => {
                handleSubmit(unitCreated);
              }}
            />
          </Box>
          <Alerts
            showError={showError}
            setShowError={setShowError}
            errorText={""}
          />
        </form>
      )}
    />
  );
};
