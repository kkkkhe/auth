import {createPageRoute} from "@/shared/lib/create-page-route";
import {SigninPage} from "@/pages/Signin/signin.page";
import {signinRouter} from "@/shared/router/routes";

export const SigninRoute = createPageRoute({view: SigninPage, route: signinRouter.route})