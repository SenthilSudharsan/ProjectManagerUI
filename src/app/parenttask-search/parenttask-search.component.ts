import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TaskServiceService } from '../task-service.service';
import { ParentTaskDialogData } from '../ParentTaskDiaologData';
import { ParentTask } from '../Task';

@Component({
  selector: 'app-parenttask-search',
  templateUrl: './parenttask-search.component.html',
  styleUrls: ['./parenttask-search.component.css']
})
export class ParenttaskSearchComponent implements OnInit {

  constructor(private taskService: TaskServiceService, public dialogRef: MatDialogRef<ParenttaskSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ParentTaskDialogData) { }

    displayedColumns = ['Parent_Id', 'Parent_Task', 'Action'];
    dataSourceParent: MatTableDataSource<ParentTask>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {
      this.taskService.getParents().subscribe(a => this.setData(a));
    }
    applyFilter(filterValue: string) {
      this.dataSourceParent.filter = filterValue.trim().toLowerCase();
    }
    setData(data: any) {
      this.dataSourceParent = new MatTableDataSource(data);
      this.dataSourceParent.paginator = this.paginator;
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

}
