import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from "./components/users/users.list";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import UnitIcon from "@material-ui/icons/AssignmentTurnedIn";
import LessonIcon from "@material-ui/icons/ListAlt";
import ExercisesIcon from "@material-ui/icons/FormatListNumbered";
import { Dashboard } from "./components/dashboard/dashboard";
import { DataProvider } from "./api/data-provider";
import { ChallengesList } from "./components/challenges/challenges.list";
import { ChallengesEdit } from "./components/challenges/challenges.edit";
import { UnitsList } from "./components/units/units.list";
import { UnitsEdit } from "./components/units/units.edit";
import { ExercisesList } from "./components/exercises/exercises.list";
import { LessonsEdit } from "./components/lessons/lessons.edit";
import { LessonsList } from "./components/lessons/lessons.list";
import { ExercisesEdit } from "./components/exercises/exercises.edit";
import { theme } from "./styles/theme";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "@blackbox-vision/ra-language-spanish";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

const App = () => (
  <Admin
    theme={theme}
    dashboard={Dashboard}
    dataProvider={DataProvider}
    i18nProvider={i18nProvider}
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
      icon={PostIcon}
      options={{ label: "Desafios" }}
    />
    <Resource
      name="units"
      list={UnitsList}
      edit={UnitsEdit}
      icon={UnitIcon}
      options={{ label: "Unidades" }}
    />
    <Resource
      name="lessons"
      list={LessonsList}
      edit={LessonsEdit}
      icon={LessonIcon}
      options={{ label: "Lecciones" }}
    />
    <Resource
      name="exercises"
      list={ExercisesList}
      edit={ExercisesEdit}
      icon={ExercisesIcon}
      options={{ label: "Ejercicios" }}
    />
  </Admin>
);

export default App;
