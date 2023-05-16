import { AirbnbComponent } from "./airbnb/airbnb.component";
import { AirbnbsComponent } from "./airbnbs/airbnbs.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";

export const AppRouter = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "airbnbs",
        component: AirbnbsComponent
    },
    {
        path: "airbnbs/:airbnbId",
        component: AirbnbComponent
    },
    {
        path: "**",
        component: ErrorPageComponent
    }
];