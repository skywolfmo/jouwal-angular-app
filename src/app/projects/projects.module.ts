import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ProjectsCategoryComponent } from './projects-category/projects-category.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MaterialModule } from '../material.module';
import { ImageUploadComponent } from './image-upload/image-upload.component';

import { HttpClientModule } from '@angular/common/http';
// import { ProjectsService } from './projects.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatorCardComponent } from './creator-card/creator-card.component';
import { PipesModule } from '../pipes/pipes.module';
// import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// import { HttpModule } from '@angular/common/http/http';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    ProjectModalComponent,
    ProjectsViewComponent,
    ProjectsCategoryComponent,
    ProjectCardComponent,
    ProgressBarComponent,
    ImageUploadComponent,
    CreatorCardComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ShareButtonsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareButtonModule,
    ShareIconsModule
    // ShareButtonModule
  ],
  providers: [
    // ProjectsService
  ],
})
export class ProjectsModule { }
