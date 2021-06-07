import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { Pokemon } from './pokemon-list/pokemon';
import { FavoritePokemonService } from './favorite-pokemon.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  apiUrl: string;

  constructor(
    private http: HttpClient,
    private favoritePokemon: FavoritePokemonService) {
      this.apiUrl = environment.apiUrl;
     }

  protected getHeaders() {
    const requestHeaders = new HttpHeaders();
    requestHeaders.set('Content-Type', 'application/json');
    return { headers: requestHeaders };
  }

  getPokemonList() {
    return this.http.get(environment.urls.pokemonList, this.getHeaders())
      .toPromise()
      .then((res: HttpResponse<Pokemon>) => {
        let info = res;
        let pokemonList = [];
        info["pokemon_entries"].forEach((entry) => {
          let pokemon = new Pokemon();
          pokemon.name = entry.pokemon_species.name;
          pokemon.id = entry.entry_number;
          pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
          pokemonList.push(pokemon);
        });
        return pokemonList;

      });
  }

  getPokemonInfo(id: number) {
    return this.http.get(environment.urls.pokemon + id + '/', this.getHeaders())
      .toPromise()
      .then((res: HttpResponse<Pokemon>) => {
        let info = res;
        let pokemon = new Pokemon();
        pokemon.name = info["name"];
        pokemon.id = info["id"];
        pokemon.isChecked = this.favoritePokemon.has(pokemon.id) ? true : false;
        
        info["types"].forEach((type) => {
          pokemon.types.push(type.type.name);
        });

        info["stats"].forEach((stats) => {
          pokemon.stats.push({
            name: stats.stat.name,
            value: stats.base_stat
          });
        });

        return pokemon;
      });
  }

  getPokemon(url: string) {
    return this.http.get<Pokemon>(url).pipe(catchError(this.handleError));
  }

  getPokemons(offset: number): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${this.apiUrl}` + `?offset=` + offset + `&limit=10`)
      .pipe(catchError(this.handleError));
  }

  getPokemonByName(name: string): Observable<Pokemon[]> {
    return this.http
      .get<Pokemon[]>(`${this.apiUrl}` + name)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error ocurred", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
