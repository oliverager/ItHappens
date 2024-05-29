import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {SharedModule} from "primeng/api";
import {ProfilePageComponent} from "./profile-page.component";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ProfilePageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogClose,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    RouterLink
  ]
})
export class ProfilePageModule { }
