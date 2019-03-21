import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Config } from './services/config.service';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;
  version: string = "1.0";
  exampleSourceUrl: string;
  dir: 'ltr' | 'rtl' = 'ltr';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private titleService: Title,
      private config: Config
  ) {
      this.config.placeholder = 'Select item';
  }

  ngOnInit() {
      this.setTitle();
  }

  private setTitle() {
      this.router.events
          .pipe(
              filter((event) => event instanceof NavigationEnd),
              map(() => this.activatedRoute),
              map((route) => {
                  while (route.firstChild) {
                      route = route.firstChild;
                  }
                  return route;
              }),
              filter((route) => route.outlet === 'primary'),
              mergeMap((route) => route.data)
          )
          .subscribe((event) => {
              this.title = event['title'];
              this.titleService.setTitle(this.title);
              this.exampleSourceUrl = `https://github.com/mdshohelrana/ng-tdv/tree/master/src/app/examples/${event['fileName']}`;
          });
  }

}