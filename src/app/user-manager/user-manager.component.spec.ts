import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import { MatTableDataSource, MatSlideToggleChange, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserManagerComponent } from './user-manager.component';
import { FilterPipe } from '../FilterPipe';

describe('UserManagerComponent', () => {
  let component: UserManagerComponent;
  let fixture: ComponentFixture<UserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagerComponent,FilterPipe ],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
