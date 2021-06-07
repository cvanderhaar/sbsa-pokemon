import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() searchSubmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  searchPokemon(event) {
    const name = new FormData(event.target).get('name');
    this.searchSubmit.emit(name);
  }

}
