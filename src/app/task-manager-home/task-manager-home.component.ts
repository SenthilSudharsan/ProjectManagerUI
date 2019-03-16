import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task, SearchTask, ParentTask } from '../Task';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../ErrorStateMatcher';
import { TaskServiceService } from '../task-service.service';
import { MatTabChangeEvent } from '@angular/material';
import { ProjectSearchComponent } from '../project-search/project-search.component';
import { Project } from '../Project';
import { ParenttaskSearchComponent } from '../parenttask-search/parenttask-search.component';
import { UserSearchComponent } from '../user-search/user-search.component';
import { User } from '../User';
import { UserManagerComponent } from '../user-manager/user-manager.component';
import { ProjectManagerComponent } from '../project-manager/project-manager.component';

@Component({
  selector: 'app-task-manager-home',
  templateUrl: './task-manager-home.component.html',
  styleUrls: ['./task-manager-home.component.css']
})
export class TaskManagerHomeComponent implements OnInit {
  testData: Task[];
  @ViewChild(UserManagerComponent) userManagerComp: UserManagerComponent;
  @ViewChild(ProjectManagerComponent) projManagerComp: ProjectManagerComponent;
  constructor(private taskService: TaskServiceService, public dialog: MatDialog) {

    this.createTask = new Task();
    this.createTask.IsCreate = true;
    this.selectedTab = 0;
    this.searchTask = new SearchTask();

  }
  ngAfterViewInit() {
    this.userManagerComp.createUserForm = new User();
    this.userManagerComp.createUserForm.IsCreate = true;
    this.projManagerComp.creatingProjectForm = new Project();
    this.projManagerComp.creatingProjectForm.IsCreate = true;
  }
  displayedColumns = ['Task', 'ParentTask', 'Priority', 'Start Date', 'End Date', 'Action'];
  //dataSource: MatTableDataSource<Task>;
  createTask: Task;
  selectedTab: number;
  searchTask: SearchTask;
  //parentTasks: ParentTask[];
  SelectedProjectName: string;
  projectDialogDataSelected: Project;
  SelectedParentName: string;
  parentDialogSelectedData: ParentTask;
  SelectedUserName: string;
  userDialogSelectedData: User;
  isProjectEmpty: boolean = false;
  isEndDateLess: boolean = false;
  CustomSearch: string;
  TaskListSource: Task[] = [];

  
  taskStartDateSort: boolean = true;
  taskEndDateSort: boolean = true;
  taskPrioritySort: boolean = true;
  taskCompletedSort: boolean = true;

  TaskFormControl = new FormControl('', [
    Validators.required,
  ]);
  PriorityFormControl = new FormControl('', [
    Validators.required,
  ]);
  StartFormControl = new FormControl('', [
    Validators.required,
  ]);
  EndFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  ngOnInit() {
    //this.taskService.getParents().subscribe(a => this.parentTasks = a);
    this.taskService.getTasks().subscribe(a => this.setData(a));
  }

  sort(sortElement: string) {
    console.log('calling sort' + sortElement);
    //this.projectSortElement = sortElement;
    if (sortElement == 'StartDate') {
      if (this.taskStartDateSort) {
        this.TaskListSource = this.TaskListSource.sort((a, b) => this.getTime(a.StartDate) - this.getTime(b.StartDate));
      }
      else {
        this.TaskListSource = this.TaskListSource.sort((a, b) => this.getTime(a.StartDate) - this.getTime(b.StartDate)).reverse();
      }
      this.taskStartDateSort = !this.taskStartDateSort;
    }
    else if (sortElement == 'EndDate') {
      if (this.taskEndDateSort) {
        this.TaskListSource = this.TaskListSource.sort((a, b) => this.getTime(a.EndDate) - this.getTime(b.EndDate));
      }
      else {
        this.TaskListSource = this.TaskListSource.sort((a, b) => this.getTime(a.EndDate) - this.getTime(b.EndDate)).reverse();
      }
      this.taskEndDateSort = !this.taskEndDateSort;
    }
    else if (sortElement == 'Priority') {
      if (this.taskPrioritySort) {
        this.TaskListSource = this.TaskListSource.sort((a, b) => a.Priority - b.Priority);
      }
      else {
        this.TaskListSource = this.TaskListSource.sort((a, b) => a.Priority - b.Priority).reverse();
      }
      this.taskPrioritySort = !this.taskPrioritySort;
    }
    else {
      if (this.taskCompletedSort) {
        this.TaskListSource = this.TaskListSource.sort((a, b) => a.Status.toLocaleString().localeCompare(b.Status.toLocaleString()));
      }
      else {
        this.TaskListSource = this.TaskListSource.sort((a, b) => a.Status.toLocaleString().localeCompare(b.Status.toLocaleString())).reverse();
      }
      this.taskCompletedSort = !this.taskCompletedSort;
    }
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
  setData(a: any) {
    this.TaskListSource = a;

  }

  editTask(task: Task, parent: ParentTask, project: Project, users: User[]) {
    this.selectedTab = 1;
    //this.taskService.getTasksById(taskId).subscribe(a => this.createTask = a);
    this.createTask.IsCreate = false;
    console.log('task');
    console.log(task);
    console.log('taparentsk');
    console.log(parent);
    console.log('Project');
    console.log(project);
    console.log('users');
    console.log(users);
    let localTask: Task = new Task();
    localTask.TaskId = task.TaskId;
    localTask.IsCreate = false;
    localTask.EndDate = task.EndDate;
    localTask.StartDate = task.StartDate;
    localTask.Task = task.Task;
    localTask.Priority = task.Priority;
    localTask.Status = task.Status;
    if (parent != undefined && parent != null) {
      localTask.ParentTaskName = parent.Parent_Task;
      localTask.Parent_Id = parent.Parent_Id;
    }
    if (project != undefined && project != null) {
      localTask.ProjectName = project.ProjectName;
      localTask.Project_Id = project.Project_Id;
    }
    if (users != undefined && users != null && users.length > 0) {
      if (users[0] != undefined && users[0] != null) {
        localTask.UserId = users[0].User_Id;
        localTask.TaskUserName = users[0].FirstName + " " + users[0].LastName;
      }
    }
    console.log(localTask);
    this.createTask = localTask;
  }

  endTask(taskId: number) {
    this.taskService.endTaskById(taskId).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
  }

  Reset() {
    this.createTask = new Task();
    this.createTask.IsCreate = true;
    this.searchTask = new SearchTask();
    this.isProjectEmpty = false;
    this.isEndDateLess = false;
  }

  onTabClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab name=> ', event.tab.textLabel);
    this.userManagerComp.createUserForm = new User();
    this.userManagerComp.createUserForm.IsCreate = true;
    this.projManagerComp.creatingProjectForm = new Project();
    this.projManagerComp.creatingProjectForm.IsCreate = true;
    this.CustomSearch = '';
    if (event.index == 2) {
      this.createTask = new Task();
      this.createTask.IsCreate = true;
      this.taskService.getTasks().subscribe(a => this.setData(a));
      this.searchTask = new SearchTask();
      this.isEndDateLess = false;
      this.isProjectEmpty = false;
    }
  }

  onSubmit(CreateTask: NgForm) {
    console.log(CreateTask.value);
    this.CompareDate();
    let localTask: Task = new Task();
    localTask = CreateTask.value;
    if (CreateTask.valid) {
      if (localTask.Project_Id == null || localTask.Project_Id == undefined) {
        this.isProjectEmpty = true;
      }
      else if (!this.isEndDateLess) {
        this.isProjectEmpty = false;
        this.isEndDateLess = false;
        if (localTask.TaskId != undefined && localTask.TaskId > 0) {
          this.taskService.updateTask(CreateTask.value, localTask.TaskId).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
          this.selectedTab = 2;
          this.createTask = new Task();
          this.searchTask = new SearchTask();
          this.createTask.IsCreate = true;
          CreateTask.resetForm()
        }
        else {
          this.taskService.addTask(CreateTask.value).subscribe(g => this.taskService.getTasks().subscribe(a => this.setData(a)));
          this.selectedTab = 2;
          this.createTask = new Task();
          this.searchTask = new SearchTask();
          this.createTask.IsCreate = true;
          CreateTask.resetForm()
        }


      }
    }
  }

  openProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectSearchComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result != null && result != undefined) {
        this.isProjectEmpty = false;
      }
      this.projectDialogDataSelected = result;
      this.SelectedProjectName = this.projectDialogDataSelected.ProjectName;
      this.createTask.Project_Id = this.projectDialogDataSelected.Project_Id;
      this.CustomSearch = this.projectDialogDataSelected.ProjectName;
    });
  }


  openParentDialog(): void {
    const dialogRef = this.dialog.open(ParenttaskSearchComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog ParenttaskSearchComponent was closed');
      console.log(result);
      this.parentDialogSelectedData = result;
      this.SelectedParentName = this.parentDialogSelectedData.Parent_Task;
      this.createTask.Parent_Id = this.parentDialogSelectedData.Parent_Id;
    });
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog UserSearchComponent was closed');
      console.log(result);
      this.userDialogSelectedData = result;
      this.SelectedUserName = this.userDialogSelectedData.FirstName + " " + this.userDialogSelectedData.LastName;
      this.createTask.UserId = this.userDialogSelectedData.User_Id;
    });
  }
  onSetParentChange(event): void {
    this.createTask.Priority = 0;
    this.createTask.Parent_Id = null;
    this.createTask.ParentTaskName = null;
    this.createTask.StartDate = null;
    this.createTask.EndDate = null;
    this.createTask.UserId = null;
    this.createTask.TaskUserName = null;
  }

  CompareDate(): void {
    console.log(this.createTask.StartDate);
    console.log(this.createTask.EndDate);
    if (this.createTask.StartDate != null && this.createTask.EndDate != null) {
      if (new Date(this.createTask.EndDate) < new Date(this.createTask.StartDate)) {
        console.log('isEndDateLess');
        this.isEndDateLess = true;
      }
      else
        this.isEndDateLess = false;

    }
  }
}
