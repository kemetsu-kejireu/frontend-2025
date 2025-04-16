import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderDTO } from '../../models/order.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit, OnDestroy{
  orders: OrderDTO[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  loading = false;
  error: string | null = null;

  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private orderSubscription: Subscription | null = null;
  private currentUserId: string = '';

  ngOnInit() {
    this.orderSubscription = this.authService.userUuid$.subscribe(uuid => {
      if (uuid) {
        this.currentUserId = uuid;
        this.loadOrders();
      } else {
        this.error = 'User not authenticated';
        this.loading = false;
      }
    });
  }

  loadOrders() {
    this.loading = true;
    this.error = null;

    this.orderService.getOrderHistory(this.currentUserId, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.orders = response.content;
        this.totalPages = response.pageable.totalPages;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load order history. Please try again later.';
        this.loading = false;
      }
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages -1) {
      this.currentPage++;
      this.loadOrders();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadOrders();
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
  }

}
