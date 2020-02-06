import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee.model';

@Component({
  selector: 'demo-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {
  public employee: Employee;
  public employeeOptions: any = {
    name: {
      required: {
        message: "Name required",
      },
    },
    email: {
      email: {
        message: "Not a valid email!"
      },
      required: {
        message: "Email required",
      },
    },
    password: {
      size: {
        min: 8,
        message: 'Password at least 8 character'
      },
      required: {
        message: "Password required",
      },
    },
    url: {
      pattern: {
        match: "^((http|https)://|github.com)",
        message: "You must enter your github account!"
      },
    },
    tel: {
      size: {
        min: 10,
        max: 10,
        message: 'Tel should be 10'
      },
      required: {
        message: "Tel required",
      },
    },
    date: {
      custom: {
        method: () => this.isAdult(),
        message: "You must 18yrs."
      },
      required: {
        message: "Date required",
      },
    },
    gender: {
      required: {
        message: "Gender required",
      },
    },
    address: {
      required: {
        message: "Address required",
      },
    },
    message: "tooltip"
  }

  constructor() { }

  ngOnInit() {
    this.employee = new Employee();
  }

  onSubmitForm(form: any) {
    let _validationResult = form.validate();
    console.log(_validationResult);
  }

  onFormReset(form: any) {
    form.reset();
  }

  isAdult() {
    let result = (this.calculateAge(new Date(this.employee.date)) >= 18)?true:false;
    return result;
  }

  calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  public optionCode = `public employeeOptions: any = {
    name: {
      required: {
        message: "Name required",
      },
    },
    email: {
      email: {
        message: "Not a valid email!"
      },
      required: {
        message: "Email required",
      },
    },
    password: {
      size: {
        min: 8,
        message: 'Password at least 8 character'
      },
      required: {
        message: "Password required",
      },
    },
    url: {
      pattern: {
        match: "^((http|https)://|github.com)",
        message: "You must enter your github account!"
      },
    },
    tel: {
      size: {
        min: 10,
        max: 10,
        message: 'Tel should be 10'
      },
      required: {
        message: "Tel required",
      },
    },
    date: {
      custom: {
        method: () => this.isAdult(),
        message: "You must 18yrs."
      },
      required: {
        message: "Date required",
      },
    },
    gender: {
      required: {
        message: "Gender required",
      },
    },
    address: {
      required: {
        message: "Address required",
      },
    },
    message: "tooltip"
  }
  `;
  public valHtml = `<form novalidate ngTdvOption="employeeOptions">
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="nameField">Name (required)</label>
      <input type="text" class="form-control" ng-tdv="name" [(ngModel)]="employee.name" id="nameField" name="nameField" placeholder="Name">
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email (email&required)</label>
      <input type="email" class="form-control" ng-tdv="email" [(ngModel)]="employee.email" id="emailField" name="emailField" placeholder="Email">
    </div>
    <div class="form-group col-md-6">
      <label for="passwordField">Password (size&required)</label>
      <input type="password" class="form-control" ng-tdv="password" [(ngModel)]="employee.password" id="passwordField" name="passwordField" placeholder="Password">
    </div>
    <div class="form-group col-md-6">
      <label for="urlField">Url (pattern)</label>
      <input type="url" class="form-control" ng-tdv="url" [(ngModel)]="employee.url" id="urlField" name="urlField" placeholder="Url">
    </div>
    <div class="form-group col-md-6">
      <label for="telField">Tel (range&required)</label>
      <input type="tel" class="form-control" ng-tdv="tel" [(ngModel)]="employee.tel" id="telField" name="telField" placeholder="Tel">
    </div>
    <div class="form-group col-md-6">
      <label for="dateField">Date of Birth (custom&required)</label>
      <input type="date" class="form-control" ng-tdv="date" [(ngModel)]="employee.date" id="dateField" name="dateField" placeholder="Date">
    </div>
    <div class="form-group col-md-6">
      <label for="selectField">Gender (required)</label>
      <select class="form-control" name="selectField" ng-tdv="gender" [(ngModel)]="employee.gender" id="selectField">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <div class="form-group col-12">
      <label for="addressField">Address (required)</label>
      <textarea class="form-control"  name="addressField" ng-tdv="address" [(ngModel)]="employee.address" id="addressField" rows="2"></textarea>
    </div>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary mr-1"  (ngTdvClick)="onSubmitForm($event)" >Save</button>
  <button type="button" class="btn btn-warning"  (ngTdvClick)="onFormReset($event)" >Reset</button>
</form>
  `;

}
