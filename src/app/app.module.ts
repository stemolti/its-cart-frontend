import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import localeIt from "@angular/common/locales/it";
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { DiscountAmountPipe } from './pipes/discount-amount.pipe';
import { CartSourceService } from './services/cart-source.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SideCartComponent } from './components/side-cart/side-cart.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { LoginComponent } from './pages/login/login.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
registerLocaleData(localeIt);

@NgModule({
  declarations: [
    AppComponent,
    CartItemComponent,
    SummaryComponent,
    DiscountAmountPipe,
    CheckoutComponent,
    ProductsComponent,
    ProductFiltersComponent,
    NavUserComponent,
    ProductCardComponent,
    SideCartComponent,
    IfAuthenticatedDirective,
    LoginComponent,
    ProductContainerComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    {provide: LOCALE_ID, useValue: 'it'},
    CurrencyPipe,
    CartSourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
