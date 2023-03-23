import { Component, Input, OnDestroy, OnInit, ViewChild, Type } from '@angular/core';
import { AdDirective } from '../ad.directive';

export interface AdComponent {
  data: any;
}


export class AdItem {
  constructor(public component: Type<any>, public data: any) { }
}


@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
    </div>
  `
})
export class HeroJobAdComponent implements AdComponent {
  @Input() data: any;
}


@Component({
  template: `
    <div class="hero-profile">
      <h3>Featured Hero Profile</h3>
      <h4>{{data.name}}</h4>

      <p>{{data.bio}}</p>

      <strong>Hire this hero today!</strong>
    </div>
  `
})
export class HeroProfileComponent implements AdComponent {
  @Input() data: any;
}



@Component({
  selector: 'app-adbanner',
  templateUrl: './adbanner.component.html',
  styleUrls: ['./adbanner.component.css']
})
export class AdbannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = [];
  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  interval: number | undefined;


  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }
  getAds() {
    this.interval = window.setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
