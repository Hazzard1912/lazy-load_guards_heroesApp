import { Component } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
})
export class BuscarComponent {
  termino: string = '';

  heroes: Heroe[] = [];

  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService, private router: Router) {}

  buscando(): void {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService
      .getHeroePorId(heroe.id)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }

  irAHeroe(): void {
    this.router.navigate(['/heroes/', this.heroeSeleccionado!.id]);
  }
}
