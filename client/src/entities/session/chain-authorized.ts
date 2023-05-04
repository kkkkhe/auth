import {createEvent, sample} from "effector";
import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {$authDone, $isAuthorized} from "@/entities/session/session.model";
import {tokenReceived} from "@/shared/api/access-token";
import {and, not} from "patronum";
import {signinRouter} from "@/shared/router/routes";

export function chainAuthorized<Params extends RouteParams>(
    {
        route,
    }:{
        route: RouteInstance<Params>,
    }){
    const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
    const authenticated = sample({
        clock: authCheckStarted,
        filter: $isAuthorized,
    })

    sample({
        clock: [authCheckStarted, $authDone],
        filter: and($authDone, not($isAuthorized), route.$isOpened),
        target: redirect({
            route: signinRouter.route
        })
    })
    sample({
        clock: authCheckStarted,
        fn: () => console.log("started")
    })
    return chainRoute({
        route,
        beforeOpen: authCheckStarted,
        openOn: [authenticated, tokenReceived],
    });
}