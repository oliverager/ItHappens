import {Routes} from '@angular/router'
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {HomeComponent} from "./home/home.component";
import {CreateAssociationsComponent} from "./create-associations/create-associations.component";
import {AssociationsInfoComponent} from "./associations-info/associations-info.component";
import {CreateEventComponent} from "./create-event/create-event.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {EventInfoComponent} from "./event-info/event-info.component";


export const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'create-associations', component: CreateAssociationsComponent},
  {path: 'associations-info/:id', component: AssociationsInfoComponent},
  {path: 'create-event/:id', component: CreateEventComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile-page', component: ProfilePageComponent},
  {path: 'event-info/:id', component: EventInfoComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

