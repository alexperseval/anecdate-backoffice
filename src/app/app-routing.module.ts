import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnecdateComponent } from './anecdate/anecdate.component';
import { AnecdateListComponent } from './anecdate-list/anecdate-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'anecdate', component: AnecdateComponent},
  {path: 'anecdate-list', component: AnecdateListComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'users', component: UsersComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
