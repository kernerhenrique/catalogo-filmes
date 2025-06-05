import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private apiKey = '8885ff1d36c9c9ac38d708c7bb0aa30d'; // ⚠️ Substitua pela sua chave real
  private apiUrl = 'https://api.themoviedb.org/3';
  private urlAleatorio = 'https://api.themoviedb.org/3/trending/movie/week?api_key=8885ff1d36c9c9ac38d708c7bb0aa30d'

  constructor(private http: HttpClient) { }

  buscarFilmes(query: string) {
    return this.http.get(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query,
        language: 'pt-BR',
      },
    });
  }

  getFilmes(): Observable<any> {
    return this.http.get<any>(this.urlAleatorio);
  }

  generos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`);
  }

  detalhesFilme(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`);
  }

  getFilmesPorGenero(generoId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/discover/movie?with_genres=${generoId}&api_key=${this.apiKey}&language=pt-BR`);
}
}
