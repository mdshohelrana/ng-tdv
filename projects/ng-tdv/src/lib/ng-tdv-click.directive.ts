import { Directive, HostListener, ElementRef, Injector, EventEmitter, Output, Input } from '@angular/core';
import { NgTdvDirective } from './ng-tdv.directive';
import { NgForm, FormGroup, FormControl } from '@angular/forms';



const _DEFAULT_RESULT = { isValid: true, validationSummaryMsgs: [] };

@Directive({
  selector: '[ng-tdv-click]'
})
export class NgTdvClickDirective {

  @Input('not') excludeText: string;
  @Input('group') groupText: string;

  @Output('ng-tdv-click') _validateEvent: EventEmitter<any> = new EventEmitter();


  private validationResult = _DEFAULT_RESULT;

  constructor(private _el: ElementRef, private _injector: Injector, private _ngForm: NgForm) { }


  @HostListener('click', ['$event'])
  private onClick(event) {
    // this._ngForm.form.markAsPristine({});
    // console.log(this._ngForm);
    // console.log(this.excludeText);
    // console.log(this.groupText);

    event['validate'] = () => { return this.validate() };
    event['reset'] = () => { return this.reset() };
    this._validateEvent.emit(event);
  }

  public validate() {
    this.validationResult["validationSummaryMsgs"].length = 0;
    this.validationResult.isValid = true;
    let maps;
    if(this.groupText !== undefined) {
      maps = this.getContols(this.findFormGroup(this._ngForm));
    } else {
      maps = this.getContols(this._ngForm);
    }
    // console.log(maps);
    for (let index = 0; index < maps.length; index++) {
      if(maps[index].hasOwnProperty("ngTdvValidator")) {
        const _result_ = maps[index]['ngTdvValidator'].callValidation();
        if (!_result_.isValid) {
          this.validationResult["validationSummaryMsgs"].push(_result_);
          this.validationResult.isValid = false;
        }
      }
    }
    return this.validationResult;
  }

  public getContols(_ngForm_: any) {
    let resultControls = new Array();
    const excludeKeys = (this.excludeText) ? this.excludeText.split(',') : [];
    Object.keys(_ngForm_.controls).map(_key_ => {
      if (_ngForm_.controls[_key_] instanceof FormControl) {
        resultControls.push(_ngForm_.controls[_key_])
      }
      if (_ngForm_.controls[_key_] instanceof FormGroup) {
        if (!excludeKeys.includes(_key_)) {
          resultControls = resultControls.concat(this.getContols(_ngForm_.controls[_key_]))
        }
      }
    });
    return resultControls;
  }

  public findFormGroup(_ngForm_: any) {
    let _fromGroup_ = null;
    let _formGroupKeys_ = Object.keys(_ngForm_.controls).filter( _key_ => {
      return _ngForm_.controls[_key_] instanceof FormGroup
    });

    if( _formGroupKeys_.includes(this.groupText) ) {
      _fromGroup_ =  _ngForm_.controls[this.groupText];
    }
    else {
      for ( let index = 0; index < _formGroupKeys_.length; index++ ) {
        _fromGroup_ = this.findFormGroup(_ngForm_.controls[_formGroupKeys_[index]]);
        if( _fromGroup_ !== null ) {
          break;
        }
      }
    }
    return _fromGroup_;
  }

  public reset() {
    this.validationResult["validationSummaryMsgs"].length = 0;
    this.validationResult.isValid = true;
    let maps;
    if(this.groupText !== undefined) {
      maps = this.getContols(this.findFormGroup(this._ngForm));
    } else {
      maps = this.getContols(this._ngForm);
    }
    for (let index = 0; index < maps.length; index++) {
      maps[index]['ngTdvValidator'].resetValidation();
    }
    return this.validationResult;
  }

}
