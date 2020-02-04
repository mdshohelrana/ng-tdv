import { Directive, SimpleChanges, OnChanges, OnInit, Injector, ElementRef, Input, Renderer2, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';
import { __values } from 'tslib';

@Directive({
  selector: '[ng-tdv]'
})
export class NgTdvDirective implements OnChanges, OnInit {

  /** NgModel for getting changes */
  @Input("ngModel") _model: NgModel;
  @Input("ng-tdv") _validationKey: string;

  public _option: any;
  public _valid: boolean = true;
  public _mouseenter: boolean = false;

  private _value: any;
  public _div: any;
  public _tooltipDiv: any;
  public _errorText: string = "";
  public _defaultErrorText: string = "This field is required";

  public _result = { fieldName: "", isValid: true, validationSummary: "" };

  constructor(
    public _injector: Injector,
    public _el: ElementRef,
    public renderer: Renderer2,
    public _modelObj: NgModel
  ) {
    this._modelObj.control['ngTdvValidator'] = this;
    this._div = this.renderer.createElement("div");
    this._tooltipDiv = this.renderer.createElement("div");
  }

  public ngOnInit(): void {
  }

  public ngOnChanges(_changes_: SimpleChanges): void {
    this._value = _changes_._model.currentValue;
    if (!_changes_._model.firstChange) {
      this.validator();
    }
    else {
      this.prepareValidationMsgs();
    }
  }

  public prepareValidationMsgs() {
    try {
      // Get validatoion option's object string from ***Form*** & get the object for this element
      let _validateOption_ = this._el.nativeElement.closest("form").getAttribute("ng-tdv-option");
      this._option = this._injector["view"].component[_validateOption_][this._validationKey];
    } catch (error) {
      this._option = null;
    }
    this.decorateElement();
  }

  public _isUndefinedOrNull(): boolean {
    return (this._option === undefined || this._option === null);
  }

  public validator() {
    this.callValidation();

  }

  public callValidation(): any {
    this._errorText = "";
    this._valid = true;
    const _element_ = this._el.nativeElement;
    if (!this._isUndefinedOrNull()) {
      if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
        if (this.isEmail(_element_) || this._option.hasOwnProperty("email")) {
          this._valid = (this._valid && this.validateEmail(this._option["email"]));
        }
        if (this._option.hasOwnProperty("min")) {
          this._valid = (this._valid && this.minValidator(this._option["min"]));
        }
        if (this._option.hasOwnProperty("size")) {
          this._valid = (this._valid && this.sizeValidator(this._option["size"]));
        }
        if (this._option.hasOwnProperty("range")) {
          this._valid = (this._valid && this.rangeValidator(this._option["range"]));
        }
        if (this._option.hasOwnProperty("pattern")) {
          this._valid = (this._valid && this.patternValidator(this._option["pattern"]));
        }
      }
      else if (this._option.hasOwnProperty("required")) {
        this._valid = (this._valid && this.requiredValidator(this._option["required"]));
      }
      if (this._option.hasOwnProperty("custom")) {
        this._valid = (this._valid && this.customValidator(this._option["custom"]));

      }

      this.setValidity();
    }
    this._result.fieldName = this._validationKey;
    this._result.isValid = this._valid;
    this._result.validationSummary = this._errorText;
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
    const tooltipText = (this._errorText) ? this._errorText : this._defaultErrorText;
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
    return element['type'] === 'email';
  }

  public isInput(element) {
    return element['nodeName'] === 'INPUT' || element['nodeName'] === 'SELECT' || element['nodeName'] === 'TEXTAREA';
  }

  public stringMinLength(sizeOptions, result) {
    if (sizeOptions.hasOwnProperty("min") && (this._value.toString().length < sizeOptions["min"])) {
      result = false;
      this._errorText = sizeOptions.message;
    }
    return result
  }

  public stringMaxLength(sizeOptions, result) {
    if (sizeOptions.hasOwnProperty("max") && (this._value.toString().length > sizeOptions["max"])) {
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
      this._errorText = _emailOptions.hasOwnProperty("message") ? _emailOptions.message : "Not a valid email";
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
      this._errorText = _patternOptions.hasOwnProperty("message") ? _patternOptions.message : "Doesn't match!";
    }
    return result;
  }

  public customValidator(_validationOptions) {
    const fn: Function = _validationOptions.method;
    const result = fn();
    if (!result) {
      this._errorText = _validationOptions.hasOwnProperty("message") ? _validationOptions.message : this._defaultErrorText;
    }
    return result;
  }

  public requiredValidator(requiredOptions): boolean {
    let result = true;
    if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
    }
    else {
      result = false;
      this._errorText = requiredOptions.hasOwnProperty("message") ? requiredOptions.message : this._defaultErrorText;
    }
    return result
  }
}

