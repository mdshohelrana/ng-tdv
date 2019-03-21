import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type langDir = 'ltr' | 'rtl';

@Component({
    selector: 'layout-header',
    template: `
        <nav class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-dark">
            <a class="navbar-brand" href="#">
                <img src="https://angular.io/assets/images/logos/angular/angular.svg" width="32px" height="32px"/>
                @ng-tdv@{{version}}
            </a>

            <div class="collapse navbar-collapse">

                <form class="form-inline my-2 my-lg-0">
                    <a class="github-button"
                       href="https://github.com/mdshohelrana/ng-tdv"
                       data-icon="mark-github"
                       data-size="large"
                       data-show-count="true"
                       aria-label="Visit ng-tdv on GitHub">Github</a>
                </form>
            </div>
        </nav>
    `,
})
export class LayoutHeaderComponent implements OnInit {
    theme = 'Default theme';
    @Input() version: string;
    @Input() dir: langDir;
    @Output() dirChange = new EventEmitter<langDir>();

    ngOnInit() {
    }

    setTheme(theme) {
        this.theme = theme;
        if (this.theme === 'Default theme') {
           
        } else {
        }
    }

    changeDirTo(dir: langDir) {
        this.dir = dir;
        this.dirChange.emit(dir);
    }
}


