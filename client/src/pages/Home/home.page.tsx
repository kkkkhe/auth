import {Link} from "atomic-router-react";
import {homeRouter} from "@/shared/router/routes";
import {getUserTriggered, logoutTriggered} from "@/pages/Home/home.model";
import {useUnit} from "effector-react";
import {$isAuthorized} from "@/entities/session";



const HomePage = () => {
    const isAuthorized = useUnit($isAuthorized)
    return (
            <div className={'bg-[#A6D0DD] flex w-full justify-between p-5 text-lg'}>
                <button onClick={() => getUserTriggered({id: 1})}>Get user</button>
                {!isAuthorized && <Link to={homeRouter.signinRoute}>
                    go to login page
                </Link>}
                {!isAuthorized && <Link to={homeRouter.signupRoute}>
                    go to register page
                </Link>}
                <div>
                    <Link to={homeRouter.profileRoute}>go to profile page</Link>
                </div>
                {isAuthorized && <button onClick={() => logoutTriggered()}>
                    logout
                </button>}

            </div>
    )
}

export default HomePage