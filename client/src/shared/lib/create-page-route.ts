import {RouteInstance} from "atomic-router";
import {LazyExoticComponent} from "react";

export const createPageRoute = <T>({view, route}: {
    view: LazyExoticComponent<() => JSX.Element>,
    route: RouteInstance<{}>}) => {
    return {
        view,
        route
    }
}