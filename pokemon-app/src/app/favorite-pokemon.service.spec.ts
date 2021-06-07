import { TestBed } from '@angular/core/testing';

import { FavoritePokemonService } from './favorite-pokemon.service';

describe('PokemonService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: FavoritePokemonService = TestBed.get(FavoritePokemonService);
        expect(service).toBeTruthy();
    });
});
