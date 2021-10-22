import Authorization from "../pages/authorization/Authorization";
import EditPage from "../pages/edit/EditPage";
import MainPage from "../pages/main/MainPage";
import {AuthPath, EditPath, MainPath} from "../Consts";

export const publicRoutes = [
    {path: AuthPath, component: Authorization, exact: true},
]

export const privateRoutes = [
    {path: EditPath, component: EditPage, exact: true},
    {path: MainPath, component: MainPage, exact: true},
]