import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnecdateComponent } from './anecdate/anecdate.component';
import { AnecdateListComponent } from './anecdate/anecdate-list/anecdate-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { AnecdateDetailComponent } from './anecdate/anecdate-detail/anecdate-detail.component';
import { AnecdateUpdateComponent } from './anecdate/anecdate-update/anecdate-update.component';

const routes: Routes = [
  {path: 'anecdate', component: AnecdateComponent},
  {path: 'anecdate/:id', component: AnecdateDetailComponent},
  {path: 'anecdate/:id/update', component: AnecdateUpdateComponent},
  {path: 'anecdate-list', component: AnecdateListComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'users', component: UsersComponent},
  { path: '',   redirectTo: '/anecdate', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
