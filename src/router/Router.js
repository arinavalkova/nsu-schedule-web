import { AddPath, AuthPath, EditPath, GreetPath, MainPath, RegPath } from "../Consts";
import GreetingPage from "../pages/greeting/GreetingPage";
import MainPage from "../pages/main/MainPage";
import EditPage from "../pages/edit/EditPage";
import AddExistsLessonPage from "../pages/addLesson/AddExistsLessonPage";
import RegPage from "../pages/reg/RegPage";
import AuthPage from "../pages/auth/AuthPage";

export const publicRoutes = [
    { path: GreetPath, component: GreetingPage, exact: true },
    { path: MainPath, component: MainPage, exact: true },
    { path: EditPath, component: EditPage, exact: true },
    { path: AddPath + ':group', component: AddExistsLessonPage, exact: true },
    { path: RegPath, component: RegPage, exact: true},
    { path: AuthPath, component: AuthPage, exact: true}
]