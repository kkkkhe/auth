import {createEvent, sample} from "effector";
import {chainRoute, redirect, RouteInstance, RouteParams, RouteParamsAndQuery} from "atomic-router";
import {$authDone, $isAuthorized} from "@/entities/session/session.model";
import {and, not} from "patronum";
import {homeRouter} from "@/shared/router/routes";

export function chainAnonymous<Params extends RouteParams>(
    {
        route,
    }:{
        route: RouteInstance<Params>,
    }){
    const authCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
    const authenticated = sample({
        clock: [authCheckStarted, $authDone],
        filter: and(not($isAuthorized), $authDone),
    })

    sample({
        clock: [authCheckStarted, $authDone],
        filter: and($authDone, $isAuthorized, route.$isOpened),
        target: redirect({
            route: homeRouter.route
        })
    })
    return chainRoute({
        route,
        beforeOpen: authCheckStarted,
        openOn: [authenticated],
    });
}