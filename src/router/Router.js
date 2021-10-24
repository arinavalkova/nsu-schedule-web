import Authorization from "../pages/authorization/Authorization";
import EditPage from "../pages/edit/EditPage";
import MainPage from "../pages/main/MainPage";
import {AddPath, AuthPath, EditPath, MainPath} from "../Consts";
import AddExistsLessonPage from "../pages/addLesson/AddExistsLessonPage";

export const publicRoutes = [
    {path: AuthPath, component: Authorization, exact: true},
]

export const privateRoutes = [
    {path: EditPath, component: EditPage, exact: true},
    {path: MainPath, component: MainPage, exact: true},
    {path: AddPath, component: AddExistsLessonPage, exact: true}
]