import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchasesService } from '../../core/services/purchases.service';
import { Purchase, PurchaseOutputDto } from '../../core/models/Purchase';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss',
  providers: [PurchasesService]
})
export class PurchasesComponent implements OnInit {
  @ViewChild('addPurchaseForm', {static:false}) public addPurchaseForm!: NgForm;

  togglePurchaseSlider = false;
  purchases: PurchaseOutputDto[] | undefined;
  newPurchase: Purchase = {
    quantity: 0,
    price: 0,
    totalAmount: 0,
    id: '',
    productId: ''
  };
  constructor(private purchasesService: PurchasesService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getPurchases();
  }

  getPurchases() {
    this.purchasesService.getPurchases()
      .subscribe(purchases => this.purchases = purchases);
  }

  editPurchase(purchase: any) {
    this.newPurchase.id = purchase.id;
    this.newPurchase.purchaseDate = purchase.purchaseDate.split('T')[0];
    this.newPurchase.totalAmount = purchase.totalAmount;
    this.newPurchase.quantity = purchase.quantity;
    this.newPurchase.price = purchase.price;
    this.newPurchase.productId = purchase.productId;
    this.togglePurchaseSlider = true;
  }

  updatePurchase(sale: Purchase) {
    sale.id = this.newPurchase.id;
    sale.productId = this.newPurchase.productId;
    this.purchasesService.updatePurchase(sale)
      .subscribe(() => {
        this.snackBar.open('Purchase updated successfully', 'Close', {
          duration: 2000
        });
        this.addPurchaseForm.form.reset();
        this.getPurchases();
        this.togglePurchaseSlider = false;
      });
  }

  deletePurchase(id: string) {
    this.purchasesService.deletePurchase(id)
      .subscribe(() => {
        this.snackBar.open('Purchase deleted successfully', 'Close', {
          duration: 2000
        });
        this.purchases = this.purchases?.filter(p => p.id !== id);
      });
  }

  enablePurchaseValidation(){
    this.addPurchaseForm.form.markAllAsTouched();    
  }
}
