import { Routes } from '@angular/router'
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserSignupComponent} from "./user-signup/user-signup.component";
import {HomeComponent} from "./home/home.component";




export const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: '', component: HomeComponent}
];

