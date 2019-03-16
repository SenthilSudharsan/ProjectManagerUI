import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { User } from '../User';
import { UserDialogData } from '../UserDialogData';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  constructor(private userService: UserServiceService, public dialogRef: MatDialogRef<UserSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) { }
  displayedColumns = ['User_Id', 'FirstName', 'LastName', 'Action'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.userService.getUsers().subscribe(a => this.setData(a));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setData(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
