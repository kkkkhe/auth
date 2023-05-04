import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import {homeRouter, profileRouter, signinRouter, signupRouter} from "@/shared/router/routes";

export const router = createHistoryRouter({
    routes: [
        {path: '/', route: [homeRouter.route, profileRouter.homeRoute]},
        {path: '/signin', route: [signinRouter.route, homeRouter.signinRoute]},
        {path: '/signup', route: [signupRouter.route, homeRouter.signupRoute]},
        {path: '/profile', route: [profileRouter.route, homeRouter.profileRoute]},
    ]
})
const history = createBrowserHistory()
router.setHistory(history)