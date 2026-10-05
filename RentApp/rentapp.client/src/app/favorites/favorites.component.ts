import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorites.service';
import { Favorite } from '../models/FavoriteModel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../models/ProductModel';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  favoriteProductIds: number[] = [];
  favoriteProducts: Product[] = [];
  allProducts: Product[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.loadFavoriteProductIds();
  }

  loadFavoriteProductIds(): void {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.favoriteProductIds = favorites.map(fav => fav.id); 
      this.loadAllProducts();
    });
  }
  loadAllProducts(): void {
    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.favoriteProducts = this.allProducts.filter(p => this.favoriteProductIds.includes(p.id));
    });
  }

  toggleFavorite(productId: number): void {
    this.favoriteService.toggleFavorite(productId).subscribe(() => {
      this.loadFavoriteProductIds();
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  rentProduct(productId: string): void {
    this.router.navigate(['/rent', productId]);
  }

  getImageUrl(path: string): string {
    if (!path) return '';
    if (path.startsWith('/uploads')) {
      return 'https://localhost:7020' + path;
    }
    return path;
  }

  isOwnProduct(product: Product): boolean {

    return product.userName === this.authService.getUserName();
  }
  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }
}
