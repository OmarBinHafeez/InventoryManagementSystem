import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { PurchasesComponent } from './features/purchases/purchases.component';
import { SalesComponent } from './features/sales/sales.component';

export const routes: Routes = [

    { path: 'products', component: ProductsComponent },
  
    { path: 'sales', component: SalesComponent },
  
    { path: 'purchases', component: PurchasesComponent },
  
    { path: '', redirectTo: '/products', pathMatch: 'full' },
  
    { path: '**', redirectTo: '/products', pathMatch: 'full' } 
  
  ];
