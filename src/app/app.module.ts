import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskManagerHomeComponent } from './task-manager-home/task-manager-home.component';
import { TaskServiceService } from './task-service.service';
import { UserServiceService } from './user-service.service';
import { ProjectServiceService } from './project-service.service';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { FilterPipe } from './FilterPipe';
import { ProjectManagerComponent } from './project-manager/project-manager.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { ParenttaskSearchComponent } from './parenttask-search/parenttask-search.component';
import { ProjectSearchComponent } from './project-search/project-search.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskManagerHomeComponent,
    UserManagerComponent,
    FilterPipe,
    ProjectManagerComponent,
    UserSearchComponent,
    ParenttaskSearchComponent,
    ProjectSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [TaskServiceService, UserServiceService, ProjectServiceService],
  bootstrap: [AppComponent],
  entryComponents: [UserSearchComponent, ParenttaskSearchComponent, ProjectSearchComponent]
})
export class AppModule { }
