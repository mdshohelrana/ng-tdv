import { Directive, HostListener, ElementRef, Injector, EventEmitter, Output, Input } from '@angular/core';
import { NgTdvDirective } from './ng-tdv.directive';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { NgTdvResult } from './ng-tdv-error.model';

@Directive({
  selector: '[ngTdvClick]'
})
export class NgTdvClickDirective {
  private ngTdvResult: NgTdvResult;

  @Input('not') excludeText: string;
  @Input('group') groupText: string;
  @Output('ngTdvClick') ngTdvClicked: EventEmitter<any> = new EventEmitter();

  constructor(private _el: ElementRef,
    private _injector: Injector,
    private ngForm: NgForm) { }

  @HostListener('click', ['$event'])
  private onClick(e: any) {
    e['validate'] = () => { return this.validate() };
    e['reset'] = () => { return this.reset() };

    this.ngTdvClicked.emit(e);
  }

  private validate() {
    this.ngTdvResult.errors.length = 0;
    this.ngTdvResult.valid = true;

    let maps: string | any[];
    if (this.groupText !== undefined) {
      maps = this.getControls(this.findFormGroup(this.ngForm));
    } else {
      maps = this.getControls(this.ngForm);
    }

    for (let index = 0; index < maps.length; index++) {
      if (maps[index].hasOwnProperty("ngTdvValidator")) {
        const result = maps[index]['ngTdvValidator'].callValidation();
        if (!result.isValid) {
          this.ngTdvResult.errors.push(result);
          this.ngTdvResult.valid = false;
        }
      }
    }

    return this.ngTdvResult;
  }

  private getControls(ngForm: any) {
    let resultControls = new Array();
    const excludeKeys = (this.excludeText) ? this.excludeText.split(',') : [];

    Object.keys(ngForm.controls).map(key => {
      if (ngForm.controls[key] instanceof FormControl) {
        resultControls.push(ngForm.controls[key])
      }

      if (ngForm.controls[key] instanceof FormGroup) {
        if (!excludeKeys.includes(key)) {
          resultControls = resultControls.concat(this.getControls(ngForm.controls[key]))
        }
      }
    });

    return resultControls;
  }

  public findFormGroup(ngForm: any) {
    let fromGroup = null;
    let formGroupKeys = Object.keys(ngForm.controls).filter(key => {
      return ngForm.controls[key] instanceof FormGroup
    });

    if (formGroupKeys.includes(this.groupText)) {
      fromGroup = ngForm.controls[this.groupText];
    }
    else {
      for (let index = 0; index < formGroupKeys.length; index++) {
        fromGroup = this.findFormGroup(ngForm.controls[formGroupKeys[index]]);
        if (fromGroup !== null) {
          break;
        }
      }
    }

    return fromGroup;
  }

  private reset() {
    this.ngTdvResult.errors.length = 0;
    this.ngTdvResult.valid = true;

    let maps: string | any[];
    if (this.groupText !== undefined) {
      maps = this.getControls(this.findFormGroup(this.ngForm));
    } else {
      maps = this.getControls(this.ngForm);
    }

    for (let index = 0; index < maps.length; index++) {
      maps[index]['ngTdvValidator'].resetValidation();
    }

    return this.ngTdvResult;
  }
}
