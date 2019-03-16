import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator,  MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ProjectSearchComponent } from './project-search.component';
import { ProjectServiceService } from '../project-service.service';

describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchComponent ],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [ProjectServiceService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
