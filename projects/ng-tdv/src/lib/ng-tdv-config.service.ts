import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgTdvConfig {
    defaultErrorMessage: 'This field is required.';
    invalidEmailMessage: 'Please provide a valid email address.';
    invalidPatternMessage: 'Please match the requested format.';
}