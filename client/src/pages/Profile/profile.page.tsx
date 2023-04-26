import {Link} from "atomic-router-react";
import {profileRouter} from "@/shared/router/routes";

export const ProfilePage = () => {
    return (
        <div>
            <div>Profile page</div>
            <Link to={profileRouter.homeRoute}>go to home page</Link>
        </div>
    )
}