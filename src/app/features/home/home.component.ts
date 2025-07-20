import { Component } from '@angular/core';
import { HeroSliderComponent } from "./components/hero-slider/hero-slider.component";
import { OurVisionComponent } from './components/our-vision/our-vision.component';
import { OurScopeComponent } from './components/our-scope/our-scope.component';
import { OneConnectedGovernmentComponent } from './components/one-connected-government/one-connected-government.component';
import { LeadershipComponent } from './components/leadership/leadership.component';
import { DownloadCenterComponent } from './components/download-center/download-center.component';

@Component({
  selector: 'app-home',
  imports: [HeroSliderComponent, OurVisionComponent, OurScopeComponent, OneConnectedGovernmentComponent, LeadershipComponent, DownloadCenterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
