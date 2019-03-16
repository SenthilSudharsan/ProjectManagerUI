import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatInputModule, MatIconModule, MatTableModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatButtonModule, MatInputModule, MatIconModule, MatToolbarModule, MatCardModule, MatTableModule, MatDialogModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatPaginatorModule,
    MatTabsModule, MatSelectModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatFormFieldModule
  ],
  exports: [CommonModule, MatButtonModule, MatInputModule, MatIconModule, MatToolbarModule, MatCardModule, MatTableModule, MatDialogModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatPaginatorModule,
    MatTabsModule, MatSelectModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatFormFieldModule]
})
export class MaterialModule { }
