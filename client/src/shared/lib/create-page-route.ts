import {RouteInstance} from "atomic-router";

export const createPageRoute = ({view, route}: {view: () => JSX.Element, route: RouteInstance<{}>}) => {
    return {
        view,
        route
    }
}