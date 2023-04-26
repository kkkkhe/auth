import {createRoutesView, RoutesViewConfig} from "atomic-router-react"
import {HomeRoute} from "@/pages/Home";
import {SigninRoute} from "@/pages/Signin";
import {ProfileRoute} from "@/pages/Profile";
import {SignupRoute} from "@/pages/Signup";
const routes = [HomeRoute, SigninRoute, ProfileRoute, SignupRoute]
export const RouterView = createRoutesView({routes})