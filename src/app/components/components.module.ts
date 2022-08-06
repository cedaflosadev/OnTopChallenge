import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WMatMenuGroupDirective } from '../shared/directives/d.directive';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    WMatMenuGroupDirective

  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule

  ],
  exports: [ToolbarComponent,
    SidebarComponent, WMatMenuGroupDirective]
})
export class ComponentsModule { }
