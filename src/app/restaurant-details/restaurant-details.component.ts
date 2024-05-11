import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'app/restaurants/restaurant/restaurant.model';
import { RestaurantsService } from 'app/restaurants/restaurants.service';


@Component({
  selector: 'ir-restaurant-details',
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private restaurantService: RestaurantsService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantService.restaurantById(this.route.snapshot.params['id'])
      .subscribe(restaurant => this.restaurant = restaurant);
  }

}
