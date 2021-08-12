import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { MaterialModule } from '../material.module';
import { CountingUpComponent } from './counting-up/counting-up.component';
import { PresentationComponent } from './presentation/presentation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, LandingComponent, TestimonialsComponent, SocialMediaComponent, FooterComponent, ContactComponent, CountingUpComponent, PresentationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HomeModule { }
