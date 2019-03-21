import { Component, OnInit, Injector } from '@angular/core';
import { Employee } from './Employee.model';

@Component({
  selector: 'demo-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css']
})
export class SimpleFormComponent implements OnInit {
  private employee:Employee;
  private employeeOptions:any = {
          "name" : {
            'size': {
              'min': 3,
              'max': 20,
              'message': 'First name is required to be between 3 and 20 characters.'
            },
            "required" : {
              "message" : "Name required",
            },
          },
          "email" : {
            "required" : {
              "message" : "Email required",
            },
          },
          "password" : {
            "required" : {
              "message" : "Password required",
            },
          },
          "url" : {
            "required" : {},
          },
          "tel" : {
            "range": {
              "value": "5,10",
              "message": "Value should be between 5 to 10"
            },
            "required" : {
              "message" : "Tel required",
            },
          },
          "date" : {
            "required" : {
              "message" : "Date required",
            },
          },
          "time" : {
            "required" : {
              "message" : "Time required",
            },
          },
          "dateTime" : {
            "required" : {
              "message" : "Date Time required",
            },
          },
          "gender" : {
            "required" : {
              "message" : "Gender required",
            },
          },
          "address" : {
            "required" : {
              "message" : "Address required",
            },
          },
          message: "tooltip"
  }

  constructor(
    private _inj:Injector
  ) { }

  ngOnInit() {
    this.employee = new Employee();
    
    
  }

  onSubmitForm(form:any) {
    let _validationResult = form.validate();
    console.log(_validationResult);
  }
  
  onFormReset(form:any) {
    form.reset();
  }

  

}
