import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/Models/Content/Project';
import { ProjectsService } from 'src/app/projects/projects.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {
  @Input() projectid: string;
  api = environment.api;
  project: Project;
  reached: number = 0;
  progress: number = 0;
  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.projectService.getProject(this.projectid).subscribe((project) => {
      this.project = project;
    });

    console.log(this.progress);
    // this.calculateFunds();
    // this.calculateProjectProgress();
  }

  public getTimeRemaining(date) {
    var t = Date.parse(date) - Date.now();
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
}
