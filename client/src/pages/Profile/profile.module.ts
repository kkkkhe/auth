import {chainAuthorized} from "@/entities/session";
import {lazy} from "react";
import {profileRouter} from "@/shared/router/routes";
import {createPageRoute} from "@/shared/lib/create-page-route";
const ProfilePage = lazy(() => import('./profile.page'))
export const chainAuthorizedRoute = chainAuthorized({route: profileRouter.route})
export const ProfileRoute = createPageRoute({view: ProfilePage, route: chainAuthorizedRoute})