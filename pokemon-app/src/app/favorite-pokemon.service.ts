import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  favorite = [];

  constructor() {
    if (window.localStorage.getItem('favorite-pokemon')) {
      const favs = JSON.parse(window.localStorage.getItem('favorite-pokemon'));
      for (let item of favs) {
        this.favorite.push(item);
      }
    }
  }

  has(id): boolean {
    const isValid = this.favorite.includes(id);
    return isValid;
  }

  update() {
    const json = JSON.stringify(this.favorite);
    window.localStorage.setItem('favorite-pokemon', json);
  }

  add(id: number) {
    this.favorite.push(id);
    this.update();
  }

  remove(id: number) {
    const pos = this.favorite.indexOf(id);
    this.favorite.splice(pos, 1);
    this.update();
  }

  get count(): number {
    return this.favorite.length;
  }
}
