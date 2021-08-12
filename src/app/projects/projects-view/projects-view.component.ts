import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css'],
  providers: [ProjectsService]
})
export class ProjectsViewComponent implements OnInit {
  projects: any;
  city: any;
  city_value: any;

  constructor(private route: ActivatedRoute, private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.city = this.route.snapshot.paramMap.get('city');
    if(this.city){
      this.searchTours(this.city);
      this.ngOnInit();
    }
    else{
      this.getProjects();
    }
  }
  getProjects() {
    const p = new Promise((res, rej) => {
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
        console.log(this.projects)
      });
      res('resolved');
    });
    return p;
  }
  searchTours(city) {
    const p = new Promise((res, rej) => {
      this.projectService.searchTours(city).subscribe(projects => {
        this.projects = projects;
        console.log(this.projects)
      });
      res('resolved');
    });
    return p;
  }

}
