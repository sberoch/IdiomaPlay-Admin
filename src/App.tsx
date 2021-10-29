import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList } from "./components/users/users.list";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";
import UnitIcon from "@material-ui/icons/AssignmentTurnedIn";
import LessonIcon from "@material-ui/icons/ListAlt";
import ExercisesIcon from "@material-ui/icons/FormatListNumbered";
import ExamsIcon from "@material-ui/icons/Timer";
import { Dashboard } from "./components/dashboard/dashboard";
import { DataProvider } from "./api/data-provider";
import { ChallengesList } from "./components/challenges/challenges.list";
import { ChallengesEdit } from "./components/challenges/challenges.edit";
import { UnitsList } from "./components/units/units.list";
import { UnitsEdit } from "./components/units/units.edit";
import { ExercisesList } from "./components/exercises/exercises.list";
import { ExamsEdit } from "./components/exams/exams.edit";
import { LessonsEdit } from "./components/lessons/lessons.edit";
import { LessonsList } from "./components/lessons/lessons.list";
import { ExamsList } from "./components/exams/exams.list";
import { ExercisesEdit } from "./components/exercises/exercises.edit";

const App = () => (
  <Admin dashboard={Dashboard} dataProvider={DataProvider}>
    <Resource name="users" list={UserList} icon={UserIcon} />
    <Resource
      name="challenges"
      list={ChallengesList}
      edit={ChallengesEdit}
      icon={PostIcon}
    />
    <Resource name="units" list={UnitsList} edit={UnitsEdit} icon={UnitIcon} />
    <Resource
      name="lessons"
      list={LessonsList}
      edit={LessonsEdit}
      icon={LessonIcon}
    />
    <Resource name="exams" list={ExamsList} edit={ExamsEdit} icon={ExamsIcon} />
    <Resource
      name="exercises"
      list={ExercisesList}
      edit={ExercisesEdit}
      icon={ExercisesIcon}
    />
  </Admin>
);

export default App;
