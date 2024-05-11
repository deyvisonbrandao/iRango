import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { from } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ir-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch',[
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})

export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden';
  restaurants: Restaurant[];
  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(private restaurantService: RestaurantsService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges.pipe(debounceTime(500),
    distinctUntilChanged(),
      switchMap(searchTerm => 
        this.restaurantService.restaurants(searchTerm)
        .pipe(
          catchError(() => from([]))
        )
    )).subscribe(restaurants => this.restaurants = restaurants);

    this.restaurantService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants);
  }

  toogleSearch(){
    this.searchBarState = this.searchBarState == 'visible' ? 'hidden' : 'visible';
  }

}
