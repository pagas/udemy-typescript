import _ from 'lodash';
import {Product} from './product.model';
import 'reflect-metadata';
import {plainToInstance} from "class-transformer";

const products = [
    {title: 'A carpet', price: 29.99},
    {title: 'A book', price: 10.99}
]

const product = new Product('A book', 12.99)
const loadedProducts = plainToInstance(Product, products)


for(const product of loadedProducts) {
    console.log(product.getInformation());
}

console.log('working', _.shuffle([1, 2, 3]));