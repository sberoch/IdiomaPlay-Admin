import spanishMessages from "@blackbox-vision/ra-language-spanish";
import PostIcon from "@material-ui/icons/Book";
import ExercisesIcon from "@material-ui/icons/FormatListNumbered";
import UserIcon from "@material-ui/icons/Group";
import LessonIcon from "@material-ui/icons/ListAlt";
import polyglotI18nProvider from "ra-i18n-polyglot";
import * as React from "react";
import { Admin, Resource } from "react-admin";
import { DataProvider } from "./api/data-provider";
import authProvider from "./authProvider";
import { ChallengesCreate } from "./components/challenges/challenges.create";
import { ChallengesEdit } from "./components/challenges/challenges.edit";
import { ChallengesList } from "./components/challenges/challenges.list";
import { Dashboard } from "./components/dashboard/dashboard";
import { ExercisesList } from "./components/exercises/exercises.list";
import { LessonsList } from "./components/lessons/lessons.list";
import { UnitsList } from "./components/units/units.list";
import { UserList } from "./components/users/users.list";
import { MyLayout } from "./Layout";
import Login from "./Login";
import { theme } from "./styles/theme";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin
    theme={theme}
    layout={MyLayout}
    dashboard={Dashboard}
    dataProvider={DataProvider}
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    loginPage={Login}
  >
    <Resource
      name="users"
      list={UserList}
      icon={UserIcon}
      options={{ label: "Usuarios" }}
    />
    <Resource
      name="challenges"
      list={ChallengesList}
      edit={ChallengesEdit}
      create={ChallengesCreate}
      icon={PostIcon}
      options={{ label: "Desafios" }}
    />
    <Resource name="units" list={UnitsList} />
    <Resource name="lessons" list={LessonsList} icon={LessonIcon} />
    <Resource name="exercises" list={ExercisesList} icon={ExercisesIcon}/>
  </Admin>
);

export default App;
