import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { ProjectServiceService } from '../project-service.service';
import { User } from '../User';
import { Project } from '../Project';
import { UserDialogData } from '../UserDialogData';
import { UserSearchComponent } from '../user-search/user-search.component';


@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.css']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private projectService: ProjectServiceService, private userService: UserServiceService,
    public dialog: MatDialog) {

  }

  creatingProjectForm: Project;
  projectDataSource: Project[] = [];
  projectSearchValue: string;
  projectSortElement: string;
  disabled: boolean = false;
  dialogDataSelected: User;
  SelectedManagerName: string;
  isProjectEndDateLess: boolean = false;
  
  projStartDateSort: boolean = true;
  projEndDateSort: boolean = true;
  projPrioritySort: boolean = true;
  projCompletedSort: boolean = true;


  ngOnInit() {
    console.log("ngOnInit");
    this.creatingProjectForm = new Project();
    this.creatingProjectForm.IsCreate = true;
    this.projectService.getProjects().subscribe(a => this.projectDataSource = a);
    this.projectSortElement = 'ProjectName';
    this.disabled = false;
    console.log(this.projectDataSource);
  }

  cancelUpdateProject() {
    this.creatingProjectForm = new Project();
    this.creatingProjectForm.IsCreate = true;
    this.disabled = false;
  }
  onSetDateChange(event) {
    console.log(event.checked);
    if (event.checked) {
      console.log(new Date());
      console.log(new Date().setDate(new Date().getDate() + 1));
      //this.selectedStartDate = new Date();
      this.creatingProjectForm.Start_Date = new Date();
      let enddate = new Date();
      enddate.setDate(enddate.getDate() + 1);
      this.creatingProjectForm.End_Date = enddate;
    }
    else {
      this.creatingProjectForm.Start_Date = null;
      this.creatingProjectForm.End_Date = null;
    }
  }

  OnProjectFormSubmit(creatingProjectForm: NgForm) {
    console.log(creatingProjectForm.value);
    this.CompareDates();
    if (creatingProjectForm.valid && !this.isProjectEndDateLess) {
      this.isProjectEndDateLess = false;
      let localProject: Project = new Project();
      localProject = creatingProjectForm.value;

      if (localProject.Project_Id != undefined && localProject.Project_Id > 0) {
        this.projectService.updateProject(creatingProjectForm.value, localProject.Project_Id).subscribe(g => this.projectService.getProjects().subscribe(a => this.projectDataSource = a));
        this.creatingProjectForm = new Project();
        this.creatingProjectForm.IsCreate = true;
        console.log("project updated");
        creatingProjectForm.resetForm();
        this.disabled = false;
      }
      else {
        this.projectService.addProject(creatingProjectForm.value).subscribe(g => this.projectService.getProjects().subscribe(a => this.projectDataSource = a));
        this.creatingProjectForm = new Project();
        this.creatingProjectForm.IsCreate = true;
        console.log("project added");
        creatingProjectForm.resetForm();
        this.disabled = false;
      }
    }
  }

  sort(sortElement: string) {
    console.log('calling sort' + sortElement);
    this.projectSortElement = sortElement;
    if (sortElement == 'StartDate') {
      if (this.projStartDateSort) {
        this.projectDataSource = this.projectDataSource.sort((a, b) => this.getTime(a.Start_Date) - this.getTime(b.Start_Date));
      }
      else {
        this.projectDataSource = this.projectDataSource.sort((a, b) => this.getTime(a.Start_Date) - this.getTime(b.Start_Date)).reverse();
      }
      this.projStartDateSort = !this.projStartDateSort;
    }
    else if (sortElement == 'EndDate') {
      if (this.projEndDateSort) {
        this.projectDataSource = this.projectDataSource.sort((a, b) => this.getTime(a.End_Date) - this.getTime(b.End_Date));
      }
      else {
        this.projectDataSource = this.projectDataSource.sort((a, b) => this.getTime(a.End_Date) - this.getTime(b.End_Date)).reverse();
      }
      this.projEndDateSort = !this.projEndDateSort;

    }
    else if (sortElement == 'Priority') {
      if (this.projPrioritySort) {
        this.projectDataSource = this.projectDataSource.sort((a, b) => a.Priority - b.Priority);
      }
      else {
        this.projectDataSource = this.projectDataSource.sort((a, b) => a.Priority - b.Priority).reverse();
      }
      this.projPrioritySort = !this.projPrioritySort;
    }
    else {
      if (this.projCompletedSort) {
        this.projectDataSource = this.projectDataSource.sort((a, b) => a.CompletedTaskCount - b.CompletedTaskCount);
      }
      else {
        this.projectDataSource = this.projectDataSource.sort((a, b) => a.CompletedTaskCount - b.CompletedTaskCount).reverse();
      }
      this.projCompletedSort = !this.projCompletedSort;
    }
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  editProject(project: Project, user: User) {
    // this.createUserForm = new User();
    console.log(user);
    let localProject: Project = new Project();
    localProject.Project_Id = project.Project_Id;
    localProject.IsCreate = false;
    localProject.End_Date = project.End_Date;
    localProject.Start_Date = project.Start_Date;
    localProject.UserId = project.UserId;
    localProject.Priority = project.Priority;
    localProject.ProjectName = project.ProjectName;
    if (user != undefined && user != null) {
      localProject.ManagerName = user.FirstName + " " + user.LastName;
      localProject.UserId = user.User_Id;
    }
    if (localProject.Start_Date != null && localProject.Start_Date != undefined) {
      this.disabled = true;
    }
    console.log(localProject);
    this.creatingProjectForm = localProject;


  }

  CompareDates(): void {
    console.log(this.creatingProjectForm.Start_Date);
    console.log(this.creatingProjectForm.End_Date);
    if (this.creatingProjectForm.Start_Date != null && this.creatingProjectForm.End_Date != null) {
      if (new Date(this.creatingProjectForm.End_Date) < new Date(this.creatingProjectForm.Start_Date)) {
        console.log('isEndDateLess');
        this.isProjectEndDateLess = true;
      }
      else
        this.isProjectEndDateLess = false;

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.dialogDataSelected = result;
      this.SelectedManagerName = this.dialogDataSelected.FirstName + " " + this.dialogDataSelected.LastName;
      this.creatingProjectForm.UserId = this.dialogDataSelected.User_Id;
    });
  }
}
