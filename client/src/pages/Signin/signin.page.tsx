import {Link} from "atomic-router-react";
import {signinRouter} from "@/shared/router/routes";

export const SigninPage = () => {
    return (
        <div>
            <div>Signin Page</div>
            <Link to={signinRouter.homeRoute}>go to home page</Link>
        </div>
    )
}