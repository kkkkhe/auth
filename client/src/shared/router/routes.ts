import {createRoute} from "atomic-router";

const homeRoute = createRoute()
const signinRoute = createRoute()
const signupRoute = createRoute()
export const profileRoute = createRoute()
export const homeRouter = {
    route: homeRoute,
    signinRoute,
    signupRoute,
    profileRoute
}

export const signinRouter = {
    route: signinRoute,
    homeRoute
}

export const profileRouter = {
    route: profileRoute,
    homeRoute
}

export const signupRouter = {
    route: signupRoute,
    homeRoute
}