import {Link} from "atomic-router-react";
import {homeRouter} from "@/shared/router/routes";
import {getUserTriggered} from "@/pages/Home/home.model";



const HomePage = () => {
    return (
            <div className={'bg-[#A6D0DD] flex w-full justify-between p-5 text-lg'}>
                <button onClick={() => getUserTriggered({id: 1})}>Get user</button>
                    <Link to={homeRouter.signinRoute}>
                        go to login page
                    </Link>
                    <Link to={homeRouter.signupRoute}>
                        go to register page
                    </Link>
                <div>
                    <Link to={homeRouter.profileRoute}>go to profile page</Link>
                </div>
            </div>
    )
}

export default HomePage