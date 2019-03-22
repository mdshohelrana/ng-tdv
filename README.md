# ng-tdv - Angular powered validation widgets
Welcome to the Angular version of the Angular **Template Driven Validation** library. This library is being built from scratch by the open source team. We are using TypeScript and targeting the template driven validation that will specially help to AngularJS developers and others.

As with template driven validation, this library is a work in progress. Please check out our list of [issues](https://github.com/mdshohelrana/ng-tdv/issues) to see all the things we are implementing. Feel free to make comments there.

This is a domain model centric approach to angular template-driven validation Learn more on the [ng-tdv website](https://github.com/mdshohelrana/ng-tdv).

## Table of Contents

- [Demo](#demo)
- [Why ng-tdv](#why-ng-tdv)
- [Install](#install)
- [Getting started](#getting-started)
- [Constraints JSON](#constraints-json)
- [Built-In Validators](#built-in-validators)
- [Develop](#develop)
- [Support](#support)
- [License](#license)
- [Credits](#credits)
- [Change logs](#change-logs)

## Demo

View all the ng-tdv directives in action at https://stackblitz.com/edit/ng-tdv

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

## Install

#### [NPM](https://www.npmjs.com/package/ng-tdv)
```bash
npm install ng-tdv --save
```

## Getting started

## Constraints JSON
## Built-In Validators
## Develop
## Support
## License
## Credits
## Change logs
