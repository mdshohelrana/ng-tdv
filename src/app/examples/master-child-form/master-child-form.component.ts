import { Component, OnInit } from '@angular/core';
import { Product, products } from './Product.model';
@Component({
  selector: 'demo-master-child-form',
  templateUrl: './master-child-form.component.html',
  styleUrls: ['./master-child-form.component.css']
})
export class MasterChildFormComponent implements OnInit {

  public cartList: Product[] = new Array();
  public productList = products;

  public customerOptions: any = {
    "name": {
      "required": {
        "message": "Customer Name required",
      },
    },
    "mobileNumber": {
      'size': {
        'min': 11,
        'max': 11,
        'message': 'Customer Name is should to be 11 characters.'
      },
      "required": {
        "message": "Mobile Number required",
      },
    },
    "address": {
      "required": {
        "message": "Address required",
      },
    },
    "country": {
      "required": {
        "message": "Country required",
      },
      'range': {
        'value': '5,20',
        'message': 'Country should between Angola & Bhutan.'
      },
    },
    "productId": {
      "required": {
        "message": "Product required",
      },
    },
    "productPrice": {
      "required": {
        "message": "Product Price required",
      },
    },
    "productQuantity": {
      "required": {
        "message": "Product Quantity required",
      },
    },
    message: "tooltip"
  }

  constructor() { }

  ngOnInit() {
  }

  onChangeProduct(product:Product) {
    const selectedItem = this.productList.find(
      (item)=> {
          return item.id==product.productId}
        );
    product.productPrice = selectedItem.price;
    product.productQuantity = 1;
  }

  addNewProduct(form) {
    console.log(form);
    
    let _validationResult = form.validate();
    if(_validationResult.isValid) {
      this.cartList.push(new Product());
    }
    console.log(_validationResult);
  }
  addProduct(form) {
    let _validationResult = form.validate();
    if(_validationResult.isValid) {
      this.cartList.push(new Product());
    }
    console.log(_validationResult);
  }
  saveCustomer(form) {
    let _validationResult = form.validate();
    console.log(_validationResult);
  }
  resetCustomer(form) {
    let _validationResult = form.reset();
    console.log(_validationResult);
  }

}
