import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  imports: [
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    MatSidenavModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule
  ],
})
export class MaterialModule {}
