import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagerComponent } from './project-manager.component';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../FilterPipe';

describe('ProjectManagerComponent', () => {
  let component: ProjectManagerComponent;
  let fixture: ComponentFixture<ProjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectManagerComponent,FilterPipe],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
