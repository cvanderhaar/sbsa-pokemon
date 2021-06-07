import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonLoadingComponent } from './pokemon-loading.component';

describe('PokemonLoadingComponent', () => {
  let component: PokemonLoadingComponent;
  let fixture: ComponentFixture<PokemonLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
