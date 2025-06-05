import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TmdbService } from '../../services/tmdb.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  filmes: any[] = [];
  isLoading = false;
  filmeAleatorio: any;

  filmesPorGeneroSeparado: { [genero: string]: any[] } = {};
  generoNomes: { [id: number]: string } = {
    12: 'Aventura',
    16: 'Animação',
    28: 'Ação'
  };

  constructor(private tmdb: TmdbService) { }

  ngOnInit() {
    this.carregarFilmesPorGeneros();

    this.tmdb.getFilmes().subscribe((filmes: any) => {
      const filmesComBackdrop = filmes.results.filter((f: any) => f.backdrop_path);
      this.filmeAleatorio = filmesComBackdrop[Math.floor(Math.random() * filmesComBackdrop.length)];
    });
  }

  filmesPorGenero(genreId: number) {
    this.isLoading = true;
    this.tmdb.getFilmesPorGenero(genreId).subscribe({
      next: (res: any) => {
        this.filmes = res.results;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  carregarFilmesPorGeneros() {
    for (const generoId in this.generoNomes) {
      this.tmdb.getFilmesPorGenero(Number(generoId)).subscribe((res: any) => {
        this.filmesPorGeneroSeparado[this.generoNomes[Number(generoId)]] = res.results.slice(0, 5);
      });
    }
  }
}
