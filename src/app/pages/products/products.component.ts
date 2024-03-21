import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductFilters, ProductService } from '../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ReplaySubject, Subject, debounceTime, filter, map, startWith, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { omitBy, isNil } from 'lodash';
import { Product } from '../../entities/product.entity';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  protected updateQueryParams$ = new ReplaySubject<ProductFilters>();

  filters$ = this.activatedRoute.data
              .pipe(
                map(({ filters }) => filters as ProductFilters)
              );

  products$ = this.activatedRoute.data
              .pipe(
                map(({ products }) => products as Product[])
              );

  protected destroyed$ = new Subject<void>();

  constructor(protected productSrv: ProductService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.updateQueryParams$
      .pipe(
        takeUntil(this.destroyed$),
        map(filters => omitBy(filters, isNil)),
        map(filters => omitBy(filters, val => val === '')),
        debounceTime(150)
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters});
      });

    this.activatedRoute.data.subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  applyFilters(value: ProductFilters) {
    this.updateQueryParams$.next(value);
  }
} 
  /*
  //products$ = this.productSrv.list({});

  filters = this.fb.group({
    name: ['',{updateOn: 'change'}],
    minPrice: [null,{updateOn: 'submit', validators: [Validators.min(0)]}],
    maxPrice: [null,{updateOn: 'submit'}]
  })

  // relazione diretta tra prodotti e filtri
  // avviene un trasformazione di filtri in prodotti
  products$ = this.filters.valueChanges
  .pipe(
    filter(_ => this.filters.valid),
    startWith<ProductFilters>({}),
    debounceTime(150),
    filter(value => {
      return !value.name || value.name.length > 3;
    }),
    switchMap(filters => {
      return this.productSrv.list(filters);
    })
  )
  

  constructor(protected productSrv: ProductService, protected fb: FormBuilder){

  }
  ngOnInit(): void {
 }*/

