import {createRoute, RouteInstance} from "atomic-router";
import {HomePage} from "@/pages/Home/home.page";
import {createPageRoute} from "@/shared/lib/create-page-route";
import {homeRouter} from "@/shared/router/routes";



export const HomeRoute = createPageRoute({view: HomePage, route: homeRouter.route})


// export const HomeRoute = {
//     route,
//     view: HomePage,
// }
