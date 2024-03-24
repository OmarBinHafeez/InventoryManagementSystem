import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, ProductDto } from '../../core/models/Product';
import { ProductsService } from '../../core/services/products.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PurchasesService } from '../../core/services/purchases.service';
import { SalesService } from '../../core/services/sales.service';
import { Sale, SaleDto } from '../../core/models/Sale';
import { Purchase, PurchaseDto } from '../../core/models/Purchase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService,SalesService,PurchasesService],
})
export class ProductsComponent implements OnInit {
  @ViewChild('addProductForm', {static:false}) public addProductForm!: NgForm;
  @ViewChild('addSaleForm', {static:false}) public addSaleForm!: NgForm;
  @ViewChild('addPurchaseForm', {static:false}) public addPurchaseForm!: NgForm;

  products: Product[] | undefined = [];
  toggleProductsSlider = false;
  toggleSalesSlider = false;
  togglePurchaseSlider = false;
  newProduct: ProductDto = {
    name: '',
    description: '',
    quantity: 0,
    price: 0
  };

  updateProd: Product = {
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    id: ''
  };
  newSale: SaleDto = {
    productId: '',
    quantity: 0,
    price: 0,
    totalAmount: 0,
    saleDate: ''
  };
  newPurchase: PurchaseDto = {
    productId: '',
    quantity: 0,
    price: 0,
    totalAmount: 0,
    purchaseDate: ''
  };
  prodTempId: any;
  isEdit: any;

  constructor(private productsService: ProductsService,
    private salesService: SalesService,
    private purchasesService: PurchasesService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isEdit = false;
    this.getProducts();
  }

  // gets the list of products
  getProducts() {
    this.productsService.getProducts()
      .subscribe(products => this.products = products);
  }

  // adds the product using addProduct from productService
  addProduct(product: any) {
    this.productsService.addProduct(this.newProduct)
      .subscribe(() => {
        this.snackBar.open('Product added successfully', 'Close', {
          duration: 2000
        });
        this.resetProductForm();
        this.products?.push(product);
        this.toggleProductsSlider = false;
      });
  }

  editProduct(product: any) {
    this.isEdit= true;
    this.prodTempId = product.id
    this.newProduct = product;
  }

  // updates the product using updateProduct from productService
  updateProduct(product: any) {
    this.updateProd.id  = this.prodTempId
    this.updateProd.name = product.name;
    this.updateProd.description = product.description;
    this.updateProd.quantity = product.quantity;
    this.updateProd.price = product.price;
    this.productsService.updateProduct(this.updateProd)
      .subscribe(() => {
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 2000
        });
        this.isEdit = false;
        this.resetProductForm();
        this.toggleProductsSlider = false;
      });
  }

  // deletes the product using deleteProduct from productService
  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
      .subscribe(() => {
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 2000
        });
        this.products = this.products?.filter(p => p.id !== id);
      });
  }
  
  // Opens sales slider
  openSaleSlider(productId: any){
    this.prodTempId = productId,
    this.toggleSalesSlider = true;
  }

  // adds the sale using addSale from salesService
  addSale(sale: any) {
    this.newSale.productId = this.prodTempId;
    this.salesService.addSale(this.newSale)
      .subscribe(() => {
        this.snackBar.open('Sale added successfully', 'Close', {
          duration: 2000
        });
        this.addSaleForm.form.reset();
        this.toggleSalesSlider = false;
      });
  }

  // Opens purchase slider
  openPurchaseSlider(productId: any){
    this.prodTempId = productId,
    this.togglePurchaseSlider = true;
  }

  // adds the purchase using addPurchase from purchasesService
  addPurchase(purchase: any){
    this.newPurchase.productId = this.prodTempId;
    this.purchasesService.addPurchase(this.newPurchase)
      .subscribe(() => {
        this.snackBar.open('Purchase added successfully', 'Close', {
          duration: 2000
        });
        this.addProductForm.form.reset();
        this.togglePurchaseSlider = false;
      });
  }

  // empty the product form
  resetProductForm(){
    this.addProductForm.form.reset();
    this.getProducts();
  }

  // empty the sale form
  resetSaleForm(){
    this.addSaleForm.form.reset();
  }

  // empty the purchase form
  resetPurchaseForm(){
    this.addPurchaseForm.form.reset();
  }

  // Opens products slider and closes other
  productSliderToggle(){
    this.toggleProductsSlider = true;
    this.toggleSalesSlider = false;
    this.togglePurchaseSlider = false;
  }

  // Opens sales slider and closes other
  saleSliderToggle(){
    this.toggleProductsSlider = false;
    this.toggleSalesSlider = true;
    this.togglePurchaseSlider = false;
  }

  // Opens purchase slider and closes other
  purchaseSliderToggle(){
    this.toggleProductsSlider = false;
    this.toggleSalesSlider = false;
    this.togglePurchaseSlider = true;
  }

  enableProductValidation(){
    this.addProductForm.form.markAllAsTouched();    
  }

  enableSaleValidation(){
    this.addSaleForm.form.markAllAsTouched();    
  }

  enablePurchaseValidation(){
    this.addPurchaseForm.form.markAllAsTouched();    
  }
}
