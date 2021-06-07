import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from './pokemon';
import { FavoritePokemonService } from '../favorite-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  
  pokemonList: Pokemon[] = [];

  pokemonGrid: Pokemon[] = [];

  isLoading: Boolean = true;

  pages: Array<Object> = [];

  error: Boolean = false;

  pokemon;
  images: Array<String> = [];
  imageIndex: number = 2;
  interval;

  constructor(
    private pokemonService: PokemonService,
    private favoritePokemon: FavoritePokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemonList()
      .then((pokemon) => {
        this.pages = [];
        this.isLoading = false;

        const totalPages = Math.ceil(pokemon.length / 15);

        for (let index = 0; index < totalPages; index++) {
          this.pages.push({ index: index + 1 });
        }

        this.pokemonList = pokemon;

        this.updatePage({ index: 1 });
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }

  loopImages() {
    this.interval = setInterval(() => {
      if (this.imageIndex >= this.images.length - 1) {
        this.imageIndex = 0;
      } else {
        this.imageIndex++;
      }
    }, 1000);
  }

  updatePage(page) {
    const pageStart = (page.index - 1) * 15;
    const pageEnd = page.index * 15;

    this.pokemonGrid = [];
    this.pokemonList.forEach(p => {
      if (p.id > pageStart && p.id <= pageEnd) {
        this.pokemonGrid.push(p);
      }
    });
  }

  onChange(event, pokemon) {
    if (event.target.checked) {
      this.favoritePokemon.add(pokemon.id);
      pokemon.isChecked = true;
    } else {
      this.favoritePokemon.remove(pokemon.id);
      pokemon.isChecked = false;

    }
  }

  getPokemonByName(name) {
    this.images = [];
    this.pokemon = this.pokemonService
      .getPokemonByName(name)
      .subscribe((data: Pokemon[]) => {
        this.pokemon = data;
        this.getImages();
      });
  }

  getImages() {
    for (let [key, value] of Object.entries(this.pokemon.sprites)) {
      if (value !== undefined && value !== null && typeof value === "string") {
        this.images.push(value);
      }
    }
    clearInterval(this.interval);
    this.loopImages();
  }

}
