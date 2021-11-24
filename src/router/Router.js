import Authorization from "../pages/authorization/Authorization";
import EditPage from "../pages/edit/EditPage";
import MainPage from "../pages/main/MainPage";
// import {AddPath, AuthPath, EditPath, MainPath} from "../Consts";
import AddExistsLessonPage from "../pages/addLesson/AddExistsLessonPage";
import {AddPath, AuthPath, EditPath, GreetPath, MainPath, RegPath} from "../Consts";
import GreetingPage from "../pages/greeting/GreetingPage";
import AuthPage from "../pages/auth/AuthPage";
import RegPage from "../pages/reg/RegPage";

export const publicRoutes = [
    {path: GreetPath, component: GreetingPage, exact: true},
    {path: AuthPath, component: AuthPage, exact: true},
    {path: RegPath, component: RegPage, exact: true}
]

export const privateRoutes = [
    {path: EditPath, component: EditPage, exact: true},
    {path: MainPath, component: MainPage, exact: true},
    {path: AddPath, component: AddExistsLessonPage, exact: true}
]