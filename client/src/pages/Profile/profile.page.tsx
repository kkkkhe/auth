import {Link} from "atomic-router-react";
import {homeRouter, profileRouter} from "@/shared/router/routes";
import {getUserTriggered} from "@/pages/Home/home.model";

export const ProfilePage = () => {
    return (
        <div>
            <div className={'bg-[#A6D0DD] flex w-full justify-between p-5 text-lg'}>
                <div>
                    <Link to={profileRouter.homeRoute}>home</Link>
                </div>
            </div>
            Profile
        </div>
    )
}