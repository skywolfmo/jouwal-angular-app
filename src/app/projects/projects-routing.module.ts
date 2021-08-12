import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectsCategoryComponent } from './projects-category/projects-category.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsViewComponent
  },
  {
    path: 'search/:city',
    component: ProjectsViewComponent
  },
  
  {
    path: 'category',
    component: ProjectsCategoryComponent
  },
  {
    path: ':id',
    component: ProjectComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
