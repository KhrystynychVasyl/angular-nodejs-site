import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/services/classes/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  imageSrc;
  baseUrl = environment.baseUrl;
  readonly API_images_URL: string = this.baseUrl + '/api/images';
  readonly API_products_URL: string = this.baseUrl + '/api/products';
  tempImageFile = null;

  addProductForm: FormGroup;

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.addProductForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      image: [null]
    });
  }
  ngOnInit() {}

  onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png'
      ) {
        this.tempImageFile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          const dataURL = reader.result;
          this.imageSrc = dataURL;
        };
        reader.readAsDataURL(event.target.files[0]);
        this.addProductForm.patchValue({
          image: this.tempImageFile
        });
      } else {
        alert('Choose Image Type File');
      }
    }
  }

  uploadNewProduct() {
    const formData = new FormData();
    formData.append('image', this.addProductForm.get('image').value);

    const newProduct = { title: '', description: '', price: 0, imageUrl: '' };
    newProduct.title = this.addProductForm.get('title').value;
    newProduct.description = this.addProductForm.get('description').value;
    newProduct.price = this.addProductForm.get('price').value;

    this.uploadImage(formData, answer => {
      newProduct.imageUrl = answer.imageUrl;
      let body: Object = {};
      body = { isMany: false, data: newProduct };
      this.http.post(this.API_products_URL, body).subscribe(answer => {
        console.log(answer);
      });
    });
  }

  uploadImage(formData, callback) {
    this.http
      .post(this.API_images_URL + '?fileType=image&collection=images', formData)
      .subscribe(answer => callback(answer)).closed;
  }
}
