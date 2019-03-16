import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProjectServiceService } from '../project-service.service';
import { ProjectDialodData } from '../ProjectDialogData';
import { Project } from '../Project';

@Component({
  selector: 'app-project-search',
  templateUrl: './project-search.component.html',
  styleUrls: ['./project-search.component.css']
})
export class ProjectSearchComponent implements OnInit {

  constructor(private projectService: ProjectServiceService, public dialogRef: MatDialogRef<ProjectSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectDialodData) { }

    displayedColumns = ['Project_Id', 'ProjectName', 'Action'];
    dataSource: MatTableDataSource<Project>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngOnInit() {
      this.projectService.getProjects().subscribe(a => this.setData(a));
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
