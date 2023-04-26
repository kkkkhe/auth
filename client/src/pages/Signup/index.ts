import {createPageRoute} from "@/shared/lib/create-page-route";
import {SignupPage} from "@/pages/Signup/signup.page";
import {signupRouter} from "@/shared/router/routes";

export const SignupRoute = createPageRoute({view: SignupPage, route: signupRouter.route})