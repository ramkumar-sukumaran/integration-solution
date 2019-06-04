import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { CategoryComponent } from './category/category.component';
import { RegisterComponent } from './register/register.component';
import { CategoryNormalViewComponent } from './category-normal-view/category-normal-view.component';
import { CategoryTakerComponent } from './category-taker/category-taker.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from './services/notes.service';
import { CategoryService } from './services/category.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { ListViewComponent } from './list-view/list-view.component';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard],
    children: [
      { path: '', redirectTo: 'view/noteview', pathMatch: 'full'},
      { path: 'view/noteview', component: NoteViewComponent},
      { path: 'view/listview', component: ListViewComponent},
      { path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'},
      { path: 'view/categorynormalview', component: CategoryNormalViewComponent},
      { path: 'view/categorycreate', component: CategoryTakerComponent},
      { path: 'category/:categoryId/edit', component: EditCategoryOpenerComponent,
        outlet: 'categoryEditOutlet'} 
    ] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    NoteComponent,
    NoteTakerComponent,
    RegisterComponent,
    NoteViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    CategoryNormalViewComponent,
    ListViewComponent,
    LeftMenuComponent,
    CategoryComponent,
    CategoryTakerComponent,
    EditCategoryOpenerComponent,
    EditCategoryViewComponent
    
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    NotesService,
    AuthenticationService,
    RouterService,
    CategoryService,
    CanActivateRouteGuard
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ EditNoteViewComponent ]
})

export class AppModule { }
