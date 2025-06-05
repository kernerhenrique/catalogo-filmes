import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [MatCardModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './genero.component.html',
  styleUrl: './genero.component.scss'
})
export class GeneroComponent {
  generoId!: number;
  filmes: any[] = [];
  filmeHero: any;
  termoBusca: string = '';

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.generoId = +params['id'];
      this.carregarFilmesDoGenero(this.generoId);
    });
  }

  carregarFilmesDoGenero(id: number): void {
    this.tmdb.getFilmesPorGenero(id).subscribe((res: any) => {
      this.filmes = res.results.slice(0, 15);
      this.filmeHero = this.filmes[Math.floor(Math.random() * this.filmes.length)];
    });
  }

  get filmesFiltrados(): any[] {
    if (!this.termoBusca.trim()) return this.filmes;

    return this.filmes.filter(filme =>
      filme.title.toLowerCase().includes(this.termoBusca.toLowerCase())
    );
  }
}
