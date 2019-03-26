# ng-tdv - Angular powered validation widgets
Welcome to the Angular version of the Angular **Template Driven Validation** library. This library is being built from scratch by the open source team. We are using TypeScript and targeting the template driven validation that will specially help to AngularJS developers and others.

As with template driven validation, this library is a work in progress. Please check out our list of [issues](https://github.com/mdshohelrana/ng-tdv/issues) to see all the things we are implementing. Feel free to make comments there.

This is a domain model centric approach to angular template-driven validation Learn more on the [ng-tdv website](https://github.com/mdshohelrana/ng-tdv).

## Table of Contents

- [Demo](#demo)
- [Versions](#versions)
- [Why ng-tdv](#why-ng-tdv)
- [Features](#features)
- [Installation](#installation)
- [Warning](#warning)
- [Getting started](#getting-started)
- [Constraints JSON](#constraints-json)
- [Built-In Validators](#built-in-validators)
  - [size](#size)
  - [minLength / maxLength](#minlength--maxlength)
  - [min / max](#min--max)
  - [required](#required)
  - [pattern](#pattern)
  - [email](#email)
  - [digits](#digits)
  - [url](#url)
- [Adding custom validators](#adding-custom-validators)
- [Develop](#develop)
- [Support](#support)
- [License](#license)
- [Credits](#credits)

## Demo

View all the ng-tdv directives in action at https://stackblitz.com/edit/ng-tdv

## Versions

| Angular| ng-tdv|
| ------|:------:| 
| v7.x  | v0.x |

## Why ng-tdv

The domain model centric validation is more important to manage a large scale application that's why we have wanted to create such type validation that will help you terrible. Characterizing the validation rules on each every field with the default Angular validators contaminates the markup with your business rules and makes them quite difficult to keep up. This is particularly valid for bigger applications, where you may have repeating models like customers or products in different forms, but require slightly different markup and therefore can't simply reuse a current structure. What's far and away more terrible: Usually you already have the validation logic in your back-end, but there is no easy way to share this information with the UI.

**ng-tdv** solves these issues by extracting the validation constraints from the markup to a JSON structure. You define
the constraints per type and field, tell ng-tdv that a form (or just a part of the form) belongs to a certain type and
**ng-tdv** automatically validates the form fields.

**ng-tdv** gives you the following advantages:
- cleaner form markup
- reusable validation constraints for your models -> easier to maintain
- possibility to generate the constraints from the models you already have in your back-end 
- an easy way to display validation messages per form field

## Features

- [x] Model centric validation
- [x] Custom binding to property or object
- [x] Pattern matching validation support
- [x] Required validation support
- [x] Min, Max validation support
- [x] Range validation support
- [x] Email validation support
- [x] Custom validation support

## Installation

You need to have an Angular project with the supported Angular version. We strongly recommend using [Angular CLI](https://cli.angular.io) for this.

#### NPM
```shell
npm install ng-tdv --save
```
#### YARN
```shell
yarn install ng-tdv --save
```

## Warning

Library is under active development and may have API breaking changes for subsequent major versions after 1.0.0.

## Getting started

You need to have an Angular project with the supported Angular version. We strongly recommend using Angular CLI for this. Once installed you need to import our main module `NgTdvModule` and angular `FormsModule` module

### Step 1: Import the NgTdvModule and angular FormsModule module:
```js
import { NgTdvModule } from 'ng-tdv';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [NgTdvModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Constraints JSON

The JSON object to define the validation rules has the following structure:

```js
  TypeName {
    FieldName {
      ValidatorName {
        <ValidatorArguments>
        message: 'error message'
      }
    }
  }
```
- **TypeName** The type of object (string)
- **FieldName** The name of the field to validate (string)
- **ValidatorName** The name of the validator (string) see below in the Built-In Validators section for the default validators
- **ValidatorArguments** arguments which are passed to the validator, see below for the optional and required arguments for the built-in validators
- **Message** the message which should be shown if the validation fails (can also be a message key if angular-translate is used)

Example:
```js
  "Person": {
    "firstName": {
      "size": {
        "min": 2,
        "max": 20,
        "message": "First name must be between 2 and 20 characters."
      }
    }
  },
  "Address": {
    "email": {
      "email": {
        "message": "Must be a valid E-Mail address."
      }
    },
    "zipCode": {
      "size": {
        "min": "4",
        "max": "6",
        "message": "Zip code must be between 4 and 6 characters."
      }
    }
  }
```

## Built-In Validators

### size
Checks the minimal and maximal length of the value.

Arguments:
- **min** The minimal string length (number, optional, default 0)
- **max** The maximal string length (number, optional)

### minLength / maxLength
Checks that the value is a string and not shorter / longer than the specified number of characters.

Arguments:
- **number** The minimal / maximal string length (number, required)

### min / max
Checks that the value is a number above/below or equal to the specified number.

Arguments:
- **value** The minimal / maximal value of the number (number, required)

### required
Marks the field as required.

### pattern
Validates the input using the specified regular expression.

Arguments:
- **value** The regular expression (string/RegExp, required)

### email
Checks that the field contains a valid e-mail address. It uses the same regular expression as Angular is using for e-mail validation.

### digits
Checks that the value is a number with the specified number of integral/fractional digits.

Arguments:
- **integer** The integral part of the number (number, required)
- **fraction** The fractional part of the number (number, required)

### url
Checks that the value is a valid URL. It uses the same regular expression as Angular for the URL validation.

## Adding custom validators

Implementing custom validation logic is easy
```js
"productQuantity": {
      "custom": ()=> {
        return true;
      },
      "required": {
        "message": "Product Quantity required",
    },
 },
```

## Develop

Clone and install dependencies:

```bash
git clone https://github.com/mdshohelrana/ng-tdv.git
cd ng-tdv
npm install
```

## Support

[Ask a question on Stack Overflow](http://stackoverflow.com/questions/ask?tags=ng-tdv) and tag it with [`ng-tdv`](http://stackoverflow.com/tags/ng-tdv).

## License

[MIT](http://opensource.org/licenses/MIT) © mdshohelrana

## Credits

Thanks a lot to [all contributors](https://github.com/mdshohelrana/ng-tdv/graphs/contributors)
