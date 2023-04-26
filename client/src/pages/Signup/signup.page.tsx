import {Link} from "atomic-router-react";
import {signupRouter} from "@/shared/router/routes";

export const SignupPage = () => {
    return (
        <div>
            <div>Signup page</div>
            <div>
                <Link to={signupRouter.homeRoute}>
                    go to home page
                </Link>
            </div>
        </div>
    )
}