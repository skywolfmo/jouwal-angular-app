import { Component, OnInit } from '@angular/core';
import { CreatorsService } from '../creators.service';
import { Creator } from 'src/app/Models/User/Creator';
import { environment } from "../../../environments/environment";
import { FavoritessService } from '../favorites.service';
import { ProjectsService } from 'src/app/projects/projects.service';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  api = environment.api;
  loading = true;
  total = 0;
  showFiller = false;
  breakpoint = 2;
  breakpoint2 = "2:3";
  creator: any;
  creatorObject: {
    creator: any
  };
  favorites = []
  notifications = []
  imageLink: string;
  constructor(private creatorService: CreatorsService, private favoritesService: FavoritessService, private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 900) ? 1 : 2;
    this.breakpoint2 = (window.innerWidth <= 900) ? "2:3" : "fit";

    this.getCreator()
      .then(() => {
        this.loading = false;
      });
    this.getFavorites()
      .then(() => {
        console.log('favorites loaded')
      })
      console.log(this.notifications)
  }

  getCreator() {
    // this.creatorService.getCreatorProfile()
    //   .subscribe(creator => this.creator = creator);
    const p = new Promise(async (res, rej) => {
      (await this.creatorService.getCreatorProfile()).subscribe(creator => {
        console.log(creator)
        this.creator = creator;
        console.log(this.creator);
      });
      res('resolved');
    });
    return p;
  }
  getFavorites() {
    const p = new Promise(async (res, rej) => {
      (await this.favoritesService.getFavorites()).subscribe(favorites => {
        this.favorites = favorites;
        if (favorites.length > 0) {
          this.getNotification(favorites)
        }
        console.log(this.favorites);
      });
      res('resolved');
    });
    return p;
  }

  getNotification(favorites) {
    console.log("Notification handling")
    favorites.forEach(favorite => {
      let article_id = favorite.article_id
      if (article_id != undefined) {
        console.log(article_id)
        this.projectsService.getProject(article_id.toString())
          .subscribe(article => {
            console.log(article)
            if (favorite.old_price != article.price) {
              this.notifications.push(article_id)
            }
          })
          console.log(this.notifications)
      }
    });
  }


  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 900) ? 1 : 2;
    this.breakpoint2 = (window.innerWidth <= 900) ? "2:3" : "fit";

  }


}
