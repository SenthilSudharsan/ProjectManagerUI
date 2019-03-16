import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../ErrorStateMatcher';
import { UserServiceService } from '../user-service.service';
import { User } from '../User';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  constructor(private userService: UserServiceService) {
    // this.createUserForm = new User();
    // this.createUserForm.IsCreate = true;
    console.log("constructor");
  }

  createUserForm: User;
  userDataSource: User[] = [];
  SearchValue: string;
  SortElement: string;
  
  userFirstNameSort: boolean = true;
  userLastNameSort: boolean = true;
  userEmpIdSort: boolean = true;

  FNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  EmpIdFormControl = new FormControl('', [
    Validators.required,
  ]);
  LNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    console.log("ngOnInit");
    this.createUserForm = new User();
    this.createUserForm.IsCreate = true;
    this.userService.getUsers().subscribe(a => this.userDataSource = a);
    this.SortElement = 'FirstName';
  }

  sort(sortElement: string) {
    console.log('calling sort' + sortElement);
    this.SortElement = sortElement;
    if (sortElement == 'FirstName') {
      if (this.userFirstNameSort) {
        this.userDataSource = this.userDataSource.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
      }
      else {
        this.userDataSource = this.userDataSource.sort((a, b) => a.FirstName.localeCompare(b.FirstName)).reverse();
      }
      this.userFirstNameSort = !this.userFirstNameSort;
    }
    else if (sortElement == 'LastName') {
      if (this.userLastNameSort) {
        this.userDataSource = this.userDataSource.sort((a, b) => a.LastName.localeCompare(b.LastName));
      }
      else {
        this.userDataSource = this.userDataSource.sort((a, b) => a.LastName.localeCompare(b.LastName)).reverse();
      }
      this.userLastNameSort = !this.userLastNameSort;
    }
    else {
      if (this.userEmpIdSort) {
        this.userDataSource = this.userDataSource.sort((a, b) => a.Employee_Id - b.Employee_Id);
      }
      else {
        this.userDataSource = this.userDataSource.sort((a, b) => a.Employee_Id - b.Employee_Id).reverse();
      }
      this.userEmpIdSort = !this.userEmpIdSort
    }
  }

  editUser(user: User) {
    // this.createUserForm = new User();
    let localUser: User = new User();
    localUser.Employee_Id = user.Employee_Id;
    localUser.IsCreate = false;
    localUser.FirstName = user.FirstName;
    localUser.LastName = user.LastName;
    localUser.User_Id = user.User_Id;
    console.log(user);
    this.createUserForm = localUser;
    //this.setTextValue = this.userDataSource[user].FirstName;

  }
  deleteUser(user: User) {
    this.userService.deleteUser(user.User_Id).subscribe(g => this.userService.getUsers().subscribe(a => this.userDataSource = a));
  }
  cancelUpdateUser() {
    this.createUserForm = new User();
    this.createUserForm.IsCreate = true;
  }
  OnUserFormSubmit(CreateUserForm: NgForm) {
    console.log(CreateUserForm.value);
    if (CreateUserForm.valid) {

      let localUser: User = new User();
      localUser = CreateUserForm.value;

      if (localUser.User_Id != undefined && localUser.User_Id > 0) {
        this.userService.updateUser(CreateUserForm.value, localUser.User_Id).subscribe(g => this.userService.getUsers().subscribe(a => this.userDataSource = a));
        this.createUserForm = new User();
        this.createUserForm.IsCreate = true;
        console.log("user updated");
        CreateUserForm.resetForm();
      }
      else {
        this.userService.addUser(CreateUserForm.value).subscribe(g => this.userService.getUsers().subscribe(a => this.userDataSource = a));
        this.createUserForm = new User();
        this.createUserForm.IsCreate = true;
        console.log("user added");
        console.log(this.userDataSource);
        CreateUserForm.resetForm();
      }
    }
  }

}
