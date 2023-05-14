import { AddActionComponent } from "./add-action/add-action.component";
import { AddJobComponent } from "./add-job/add-job.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { JobsearchingComponent } from "./jobsearching/jobsearching.component";
import { JobsearchingsComponent } from "./jobsearchings/jobsearchings.component";
import { SearchpostdateComponent } from "./searchpostdate/searchpostdate.component";
import { SearchskillsComponent } from "./searchskills/searchskills.component";

export const AppRouter = [
    {
        path:"",
        component:JobsearchingsComponent
    },
    {
        path:"jobopenings/:jobopeningId/addAction",
        component: AddActionComponent
    },
    {
        path:"jobopenings/:jobopeningId/updatejob",
        component:AddJobComponent
    },
    {
        path:"jobopenings/:jobopeningId",
        component:JobsearchingComponent
    },
    {
        path:"jobopenings",
        component:JobsearchingsComponent
    },
    {
        path:"addjob",
        component:AddJobComponent
    },
    {
        path:"searchskills",
        component:SearchskillsComponent
    },
    {
        path:"searchpostdate",
        component:SearchpostdateComponent
    },
    {
        path:"**",
        component: ErrorPageComponent
    }
];