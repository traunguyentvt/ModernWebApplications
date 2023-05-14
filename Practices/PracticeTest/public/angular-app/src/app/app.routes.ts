import { AddJobComponent } from "./add-job/add-job.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { JobsearchingComponent } from "./jobsearching/jobsearching.component";
import { JobsearchingsComponent } from "./jobsearchings/jobsearchings.component";

export const AppRouter = [
    {
        path:"",
        component:JobsearchingsComponent
    },
    {
        path:"jobopenings",
        component:JobsearchingsComponent
    },
    {
        path:"jobopenings/:jobopeningId",
        component:JobsearchingComponent
    },
    {
        path:"addjob",
        component:AddJobComponent
    },
    {
        path:"updatejob/:jobopeningId",
        component:AddJobComponent
    },
    {
        path:"**",
        component: ErrorPageComponent
    }
];