import Box from "@mui/material/Box";
import React from "react";
import { FormWithRedirect } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { config } from "../../common/config";
import { ChallengesAdd } from "./challenges.add";

export const ChallengesCreate = (props: any) => {
  let history = useHistory();

  const removeLocalIds = (challenge: any) => {
    for (let unit of challenge.units) {
      delete unit.id;
      for (let lesson of unit.lessons) {
        delete lesson.id;
        for (let exercise of lesson.exercises) {
          delete exercise.id;
        }
      }
    }
    return challenge;
  };

  const handleSubmit = async (challenge: any) => {
    //Postear al back{
    challenge = removeLocalIds(challenge);
    const res = await api.post(config.challenges, {
      title: challenge.title,
      units: challenge.units,
    });
    console.log(res);
    //Redirect
    history.push("/challenges");
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
            <ChallengesAdd
              handleSubmit={(unitCreated: any) => {
                handleSubmit(unitCreated);
              }}
            />
          </Box>
        </form>
      )}
    />
  );
};
