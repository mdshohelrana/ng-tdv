import { Directive, SimpleChanges, OnChanges, OnInit, Injector, ElementRef, Input, Renderer2, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgTdvConfig } from './ng-tdv-config.service';
import { NgTdvError } from './ng-tdv-error.model';
import { NgTdvValidationKeyCode } from './ng-tdv-validation-key-code';
import { isDefined } from './value-utils'

const NG_TDV_OPTION: string = 'ngTdvOption';

@Directive({
  selector: '[ngTdv]'
})
export class NgTdvDirective implements OnChanges, OnInit {
  @Input('ngModel') public ngModel: NgModel;
  @Input('ngTdv') public ngTdv: string;

  private defaultErrorMessage: string;
  private invalidEmailMessage: string;
  private invalidPatternMessage: string;

  public _option: any;
  public _valid: boolean = true;
  public _mouseenter: boolean = false;

  private _value: any;
  public _div: any;
  public _tooltipDiv: any;
  public _errorText: string = '';

  public _result: NgTdvError = { fieldName: '', isValid: true, message: '' };

  constructor(
    public _injector: Injector,
    public _el: ElementRef,
    public renderer: Renderer2,
    public _modelObj: NgModel,
    public config: NgTdvConfig
  ) {
    this.mergeGlobalConfig(config);
    this._modelObj.control['ngTdvValidator'] = this;
    this._div = this.renderer.createElement("div");
    this._tooltipDiv = this.renderer.createElement("div");
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(_changes_: SimpleChanges): void {
    this._value = _changes_.ngModel.currentValue;
    if (!_changes_.ngModel.firstChange) {
      this.validator();
    }
    else {
      this.prepareValidationMsgs();
    }
  }

  public prepareValidationMsgs() {
    try {
      let _validateOption_ = this._el.nativeElement.closest("form").getAttribute(NG_TDV_OPTION);
      this._option = this._injector["view"].component[_validateOption_][this.ngTdv];
    } catch (error) {
      this._option = null;
    }
    this.decorateElement();
  }

  public validator() {
    this.callValidation();
  }

  public callValidation(): any {
    this._errorText = "";
    this._valid = true;
    const _element_ = this._el.nativeElement;
    if (isDefined(this._option)) {
      if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
        if (this.isEmail(_element_) || this._option.hasOwnProperty(NgTdvValidationKeyCode.EMAIL)) {
          this._valid = (this._valid && this.validateEmail(this._option[NgTdvValidationKeyCode.EMAIL]));
        }
        if (this._option.hasOwnProperty(NgTdvValidationKeyCode.MIN)) {
          this._valid = (this._valid && this.minValidator(this._option[NgTdvValidationKeyCode.MIN]));
        }
        if (this._option.hasOwnProperty(NgTdvValidationKeyCode.SIZE)) {
          this._valid = (this._valid && this.sizeValidator(this._option[NgTdvValidationKeyCode.SIZE]));
        }
        if (this._option.hasOwnProperty(NgTdvValidationKeyCode.RANGE)) {
          this._valid = (this._valid && this.rangeValidator(this._option[NgTdvValidationKeyCode.RANGE]));
        }
        if (this._option.hasOwnProperty(NgTdvValidationKeyCode.PATTERN)) {
          this._valid = (this._valid && this.patternValidator(this._option[NgTdvValidationKeyCode.PATTERN]));
        }
      }
      else if (this._option.hasOwnProperty(NgTdvValidationKeyCode.REQUIRED)) {
        this._valid = (this._valid && this.requiredValidator(this._option[NgTdvValidationKeyCode.REQUIRED]));
      }
      if (this._option.hasOwnProperty(NgTdvValidationKeyCode.CUSTOM)) {
        this._valid = (this._valid && this.customValidator(this._option[NgTdvValidationKeyCode.CUSTOM]));

      }

      this.setValidity();
    }
    this._result.fieldName = this.ngTdv;
    this._result.isValid = this._valid;
    this._result.message = this._errorText;
    return this._result;
  }

  public resetValidation() {
    this._valid = true;
    this.removeError();
  }

  public setValidity() {
    if (!this._valid) {
      this.setError();
    }
    else {
      this.removeError();
    }

  }

  public setError() {
    this._modelObj.control.setErrors({ 'incorrect': true });
    this.showValidationMessage();
  }

  public removeError() {
    this._modelObj.control.setErrors(null);
    this.removeValidationTooltip();
    this.removeBorder();
  }

  public showValidationMessage() {
    this.addValidationTooltip();
    this.addBorder();
  }

  public addValidationTooltip() {
    // this._el.nativeElement.previousElementSibling.getElementsByClassName("tooltip-inner")[0].innerText = this._errorText;
    this.renderer.setProperty(this._tooltipDiv, "innerText", this._errorText);
    if (this._mouseenter) this.renderer.addClass(this._div, "show");
  }

  public removeValidationTooltip() {
    this.renderer.removeClass(this._div, "show");
  }

  public addBorder() {
    this.renderer.setStyle(this._el.nativeElement, "border", "1px solid red");
  }

  public removeBorder() {
    this.renderer.removeStyle(this._el.nativeElement, "border");
  }

  public decorateElement() {

    this.renderer.addClass(this._div, "tooltip");
    this.renderer.addClass(this._div, "fade");
    this.renderer.addClass(this._div, "bs-tooltip-top");
    this.renderer.setStyle(this._div, "bottom", "34px");
    this.renderer.setStyle(this._div, "top", "initial");
    this.renderer.setStyle(this._div, "right", "0");
    this.renderer.setStyle(this._div, "pointer-events", "none");
    const arrowDiv = this.renderer.createElement("div");
    this.renderer.addClass(arrowDiv, "arrow");
    this.renderer.setStyle(arrowDiv, "left", "50%");
    this.renderer.setStyle(arrowDiv, "transform", "translateX(-50%)");
    const tooltipText = (this._errorText) ? this._errorText : this.defaultErrorMessage;
    this.renderer.addClass(this._tooltipDiv, "tooltip-inner");
    this.renderer.setProperty(this._tooltipDiv, "innerText", tooltipText);
    this.renderer.appendChild(this._div, arrowDiv);
    this.renderer.appendChild(this._div, this._tooltipDiv);
    this.renderer.insertBefore(this._el.nativeElement.parentNode, this._div, this._el.nativeElement);
  }

  @HostListener("mouseenter")
  showTootip() {
    this._mouseenter = true;
    if (!this._valid) {
      this.renderer.addClass(this._div, "show");
    }
  }

  @HostListener("mouseleave")
  hideTooltip() {
    this._mouseenter = false;
    this.renderer.removeClass(this._div, "show");
  }

  public _getTime() { }
  public setResult() { }
  public callGridValidationGrps() { }

  public isEmail(element) {
    return element['type'] === NgTdvValidationKeyCode.EMAIL;
  }

  public isInput(element) {
    return element['nodeName'] === 'INPUT' || element['nodeName'] === 'SELECT' || element['nodeName'] === 'TEXTAREA';
  }

  public stringMinLength(sizeOptions, result) {
    if (sizeOptions.hasOwnProperty(NgTdvValidationKeyCode.MIN) && (this._value.toString().length < sizeOptions[NgTdvValidationKeyCode.MIN])) {
      result = false;
      this._errorText = sizeOptions.message;
    }
    return result
  }

  public stringMaxLength(sizeOptions, result) {
    if (sizeOptions.hasOwnProperty(NgTdvValidationKeyCode.MAX) && (this._value.toString().length > sizeOptions[NgTdvValidationKeyCode.MAX])) {
      result = false;
      this._errorText = sizeOptions.message;
    }
    return result
  }

  public validateEmail(_emailOptions: any = {}) {
    let result: boolean;
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var patt = new RegExp(re);
    result = patt.test(this._value);
    if (!result) {
      this._errorText = _emailOptions.hasOwnProperty("message") ? _emailOptions.message : this.invalidEmailMessage;
    }
    return result;
  }

  public minValidator(_minOptions_) {
    let result = true;
    const value = +this._value;
    if (value < _minOptions_["value"]) {
      result = false;
      this._errorText = _minOptions_.message;
    }
    return result;
  }

  public sizeValidator(sizeOptions) {
    let result = true;
    result = this.stringMinLength(sizeOptions, result);
    result = this.stringMaxLength(sizeOptions, result);

    return result;
  }

  public rangeValidator(rangeOptions) {
    let result = true;
    let _value_ = this._value;
    try {
      if (typeof _value_ === "string") {
        _value_ = parseFloat(_value_);
      }

      const dataRange = rangeOptions.hasOwnProperty("value") ? rangeOptions.value : "";

      if ((typeof _value_ === "number") && (!isNaN(_value_))) {
        let range_array = dataRange.split(',');

        if (range_array.length === 2) {
          let minRange = parseFloat(range_array[0]);
          let maxRange = parseFloat(range_array[1]);

          if (minRange != null && _value_ < minRange) {
            this._errorText = rangeOptions.message;
            return result = false;
          }
          if (maxRange != null && _value_ > maxRange) {
            this._errorText = rangeOptions.message;
            return result = false;
          }
        }
        else {
          var range = parseFloat(dataRange);
          if ((typeof range === "number") && (!isNaN(range))) {
            if (_value_ < range) {
              this._errorText = rangeOptions.message;
              result = false;
            }
          }
        }
      } else {
        this._errorText = rangeOptions.message;
        result = false;
      }
    } catch (e) {
      this._errorText = e.message;
      result = false;
    }
    return result;
  }

  public patternValidator(_patternOptions) {
    const _pattern_ = _patternOptions['match']
    let patt = new RegExp(_pattern_, "g");
    const result = patt.test(this._value);
    if (!result) {
      this._errorText = _patternOptions.hasOwnProperty("message") ? _patternOptions.message : this.invalidPatternMessage;
    }
    return result;
  }

  public customValidator(_validationOptions) {
    const fn: Function = _validationOptions.method;
    const result = fn();
    if (!result) {
      this._errorText = _validationOptions.hasOwnProperty("message") ? _validationOptions.message : this.defaultErrorMessage;
    }
    return result;
  }

  public requiredValidator(requiredOptions): boolean {
    let result = true;
    if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
    }
    else {
      result = false;
      this._errorText = requiredOptions.hasOwnProperty("message") ? requiredOptions.message : this.defaultErrorMessage;
    }
    return result
  }

  private mergeGlobalConfig(config: NgTdvConfig) {
    this.defaultErrorMessage = this.defaultErrorMessage || config.defaultErrorMessage;
    this.invalidEmailMessage = this.invalidEmailMessage || config.invalidEmailMessage;
    this.invalidPatternMessage = this.invalidPatternMessage || config.invalidPatternMessage;
  }
}
