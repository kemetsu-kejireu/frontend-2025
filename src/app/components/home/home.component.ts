import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public categoryList: string[] = ['Fridge', 'Washer', 'Kitchen', 'Vacuum', 'Climate', 'TV', 'Other'];
  public productList: Product[] = [
    { productId: 1, rating: 4, productName: 'French Door Fridge', category: 'Fridge', price: 2200, isSale: false, releaseDate: '2024-02-01', availableQty: 3, imageUrl: 'assets/images/1.jpg' },
    { productId: 2, rating: 5, productName: 'Side-by-Side Fridge', category: 'Fridge', price: 1700, isSale: false, releaseDate: '2023-03-22', availableQty: 0, imageUrl: 'assets/images/2.jpg' },
    { productId: 3, rating: 3, productName: 'Top-Freezer Fridge', category: 'Fridge', price: 1100, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/3.jpg' },
    { productId: 4, rating: 5, productName: 'Front Load Washer', category: 'Washer', price: 800, isSale: false, releaseDate: '2022-12-30', availableQty: 0, imageUrl: 'assets/images/4.jpg' },
    { productId: 5, rating: 3, productName: 'Top Load Washer', category: 'Washer', price: 700, isSale: true, releaseDate: '2023-02-14', availableQty: 2, imageUrl: 'assets/images/5.jpg' },
    { productId: 6, rating: 1, productName: 'OTR Microwave', category: 'Kitchen', price: 250, isSale: false, releaseDate: '2023-04-08', availableQty: 8, imageUrl: 'assets/images/6.jpg' },
    { productId: 7, rating: 3, productName: 'Stand Mixer', category: 'Kitchen', price: 350, isSale: true, releaseDate: '2023-05-28', availableQty: 3, imageUrl: 'assets/images/7.jpg' },
    { productId: 8, rating: 2, productName: 'High-Power Vacuum', category: 'Vacuum', price: 450, isSale: false, releaseDate: '2023-01-17', availableQty: 0, imageUrl: 'assets/images/8.jpg' },
    { productId: 9, rating: 5, productName: 'Robot Vacuum', category: 'Vacuum', price: 650, isSale: true, releaseDate: '2023-03-11', availableQty: 1, imageUrl: 'assets/images/9.jpg' },
    { productId: 10, rating: 1, productName: 'Air Purifier & Heater', category: 'Climate', price: 400, isSale: false, releaseDate: '2022-11-25', availableQty: 2, imageUrl: 'assets/images/10.jpg' },
    { productId: 11, rating: 2, productName: 'Evaporative Cooler', category: 'Climate', price: 300, isSale: false, releaseDate: '2023-02-05', availableQty: 4, imageUrl: 'assets/images/11.jpg' },
    { productId: 12, rating: 4, productName: '65 Inch 4K TV', category: 'TV', price: 1100, isSale: false, releaseDate: '2024-04-21', availableQty: 7, imageUrl: 'assets/images/12.jpg' },
    { productId: 13, rating: 3, productName: 'OLED TV', category: 'TV', price: 2000, isSale: false, releaseDate: '2023-01-03', availableQty: 2, imageUrl: 'assets/images/13.jpg' },
    { productId: 14, rating: 2, productName: 'Mini TV', category: 'TV', price: 250, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/14.jpg' },
    { productId: 15, rating: 5, productName: 'Compact TV', category: 'TV', price: 300, isSale: true, releaseDate: '2023-01-10', availableQty: 5, imageUrl: 'assets/images/15.jpg' }
  ];

  public filteredProducts: Product[] = [];
  public selectedCategory: string = '';

  constructor() {
    this.productList = this.markNewProducts(this.productList);
    this.filteredProducts = this.productList;
  }

  public trackByIndex(index: number, item: any): number {
    return index;
  }

  private markNewProducts(productList: Product[]): Product[] {
    const referenceDate = new Date('2024-04-01');
    const threeMonthAgo = new Date(referenceDate);
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() -3);

    return productList.map(product => {
      const releaseDate = new Date(product.releaseDate);
      product.isNew = releaseDate > threeMonthAgo;
      return product;
    });
  }

  public filterCategory(category: string): void {
    if(this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.productList;
    } else {
      this.selectedCategory = category;
      this.filteredProducts = this.productList.filter(product => product.category === category);
    }
  }

  public sortProducts(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    if(target) {
      const sortOption = target.value;
      switch(sortOption){
        case 'priceAsc':
          this.filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceDesc':
          this.filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'ratingDesc':
          this.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          this.filteredProducts.sort((a, b) => a.productId - b.productId);
          break;
      }
    }
  }

}
