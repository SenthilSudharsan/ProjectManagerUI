import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserSearchComponent } from './user-search.component';
import { UserServiceService } from '../user-service.service';
//import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchComponent ],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      providers: [UserServiceService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
