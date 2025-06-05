import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-filme',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './detalhes-filme.component.html',
  styleUrl: './detalhes-filme.component.scss'
})
export class DetalhesFilmeComponent {

  filme: any;
  generoNomes: string = '';
  roundedRating = 0;

  constructor(private route: ActivatedRoute, private tmdb: TmdbService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tmdb.detalhesFilme(+id).subscribe((res) => {
        this.filme = res;
        this.generoNomes = this.filme.genres.map((g: any) => g.name).join(', ');
      });
    }

    if (this.filme) {
      this.roundedRating = Math.round(this.filme.vote_average / 2); // escala de 5 estrelas
    }
  }

  assistirTrailer() {
    window.open(`https://www.youtube.com/results?search_query=${this.filme.title} trailer`, '_blank');
  }

  voltar() {
    window.history.back();
  }
}
