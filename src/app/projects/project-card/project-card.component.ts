import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/Models/Content/Project';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;
  api = environment.api;
  reached: number = 0;
  progress: number = 0;
  constructor() { }

  ngOnInit(): void {
    console.log(this.project);
    this.progress = 0;
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
