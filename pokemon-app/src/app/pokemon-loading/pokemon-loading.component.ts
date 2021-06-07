import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-loading',
  templateUrl: './pokemon-loading.component.html',
  styleUrls: ['./pokemon-loading.component.css']
})
export class PokemonLoadingComponent implements OnInit {

  @Input('isLoading') isLoading: Boolean;

  constructor() { }

  ngOnInit() {
  }

}
