import {Routes} from '@angular/router'
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {HomeComponent} from "./home/home.component";
import {AssociationsComponent} from "./associations/associations.component";
import {AssociationsPageComponent} from "./associations-page/associations-page.component";
import {EventPageComponent} from "./event-page/event-page.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";
import {JoinEventComponent} from "./join-event/join-event.component";


export const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'associations', component: AssociationsComponent},
  {path: 'app-associations-page/:id', component: AssociationsPageComponent},
  {path: 'app-event-page/:id', component: EventPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile-page', component: ProfilePageComponent},
  {path: 'join-event', component: JoinEventComponent},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

