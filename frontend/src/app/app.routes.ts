import {Routes} from '@angular/router'
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {HomeComponent} from "./home/home.component";
import {AssociationsComponent} from "./associations/associations.component";
import {AssociationsInfoComponent} from "./associations-info/associations-info.component";
import {EventPageComponent} from "./event-page/event-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {EventInfoComponent} from "./event-info/event-info.component";


export const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'associations', component: AssociationsComponent},
  {path: 'app-associations-info/:id', component: AssociationsInfoComponent},
  {path: 'app-event-page/:id', component: EventPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile-page', component: ProfilePageComponent},
  {path: 'event-info/:id', component: EventInfoComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

