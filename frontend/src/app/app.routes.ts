import { Routes } from '@angular/router'
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {HomeComponent} from "./home/home.component";
import {AssociationsComponent} from "./associations/associations.component";
import {AssociationsPageComponent} from "./associations-page/associations-page.component";





export const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'associations', component: AssociationsComponent},
  {path: 'app-associations-page/:id', component: AssociationsPageComponent},
  {path: '', component: HomeComponent},
];

