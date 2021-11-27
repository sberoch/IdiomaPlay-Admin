import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { FormWithRedirect } from "react-admin";
import { useHistory } from "react-router-dom";
import api from "../../api/axios";
import { ChallengesAdd } from "./challenges.add";

export const ChallengesEdit = (props: any) => {
  let history = useHistory();
  let [challenge, setChallenge] = useState<any>(null);

  useEffect(() => {
    if (props.id) {
      const getChallenge = async () => {
        const res = await api.get("challenges/" + props.id + "?full=true");
        console.log(res.data);
        setChallenge(res.data);
      };
      getChallenge();
    }
  }, [props.id]);

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
    const res = await api.patch("challenges/" + props.id, {
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
            {challenge && (
              <ChallengesAdd
                handleSubmit={(unitCreated: any) => {
                  handleSubmit(unitCreated);
                }}
                challenge={challenge}
              />
            )}
          </Box>
        </form>
      )}
    />
  );
};

// import { Edit, SimpleForm, TextInput, EditProps } from "react-admin";

// export const ChallengesEdit = (props: EditProps) => (
//   <Edit {...props}>
//     <SimpleForm>
//       <TextInput disabled source="id" variant="outlined" />
//       <TextInput source="title" variant="outlined" label="Titulo" />
//     </SimpleForm>
//   </Edit>
// );
