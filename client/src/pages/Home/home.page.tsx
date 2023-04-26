import {Link} from "atomic-router-react";
import {homeRouter} from "@/shared/router/routes";

export const HomePage = () => {
    return (
        <div>
            <div>Home</div>
            <div className={'flex gap-5'}>
                <Link to={homeRouter.signinRoute}>
                    go to login page
                </Link>
                <Link to={homeRouter.signupRoute}>
                    go to register page
                </Link>
            </div>
            <div>
                <Link to={homeRouter.profileRoute}>go to profile page</Link>
            </div>
        </div>
    )
}