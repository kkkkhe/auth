import {createPageRoute} from "@/shared/lib/create-page-route";
import {ProfilePage} from "@/pages/Profile/profile.page";
import {profileRouter} from "@/shared/router/routes";

export const ProfileRoute = createPageRoute({view: ProfilePage, route: profileRouter.route})
