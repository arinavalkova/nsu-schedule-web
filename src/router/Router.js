import Authorization from "../pages/authorization/Authorization";
import EditPage from "../pages/edit/EditPage";
import MainPage from "../pages/main/MainPage";
import Error from "../pages/Error";

export const publicRoutes = [
    {path: '/auth', component: Authorization, exact: true},
    {path: '/error', component: Error, exact: true}
]

export const privateRoutes = [
    {path: '/main', component: MainPage, exact: true},
    {path: '/edit', component: EditPage, exact: true},
]