import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '../../core/services/sales.service';
import { Sale, SaleOutputDto } from '../../core/models/Sale';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
  providers: [SalesService]
})
export class SalesComponent implements OnInit {
  @ViewChild('addSaleForm', {static:false}) public addSaleForm!: NgForm;
  toggleSalesSlider = false;
  sales: SaleOutputDto[] | undefined;
  newSale: Sale = {
    quantity: 0,
    price: 0,
    totalAmount: 0,
    id: '',
    productId: ''
  };
  constructor(private salesService: SalesService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.salesService.getSales()
      .subscribe(sales => this.sales = sales);
  }

  editSale(sale: any) {
    this.newSale.id = sale.id;
    this.newSale.saleDate = sale.saleDate.split('T')[0];
    this.newSale.totalAmount = sale.totalAmount;
    this.newSale.quantity = sale.quantity;
    this.newSale.price = sale.price;
    this.newSale.productId = sale.productId;
    this.toggleSalesSlider = true;
  }

  updateSale(sale: Sale) {
    sale.id = this.newSale.id;
    sale.productId = this.newSale.productId;
    this.salesService.updateSale(sale)
      .subscribe(() => {
        this.snackBar.open('Sale updated successfully', 'Close', {
          duration: 2000
        });
        this.addSaleForm.form.reset();
        this.getSales();
        this.toggleSalesSlider = false;
      });
  }

  deleteSale(id: string) {
    this.salesService.deleteSale(id)
      .subscribe(() => {
        this.snackBar.open('Sale deleted successfully', 'Close', {
          duration: 2000
        });
        this.sales = this.sales?.filter(p => p.id !== id);
      });
  }

  enableSaleValidation(){
    this.addSaleForm.form.markAllAsTouched();    
  }
}
