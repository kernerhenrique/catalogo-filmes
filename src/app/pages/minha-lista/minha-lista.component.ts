import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TmdbService } from '../../services/tmdb.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-minha-lista',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule],
  templateUrl: './minha-lista.component.html',
  styleUrl: './minha-lista.component.scss'
})
export class MinhaListaComponent {
  form: FormGroup;
  filmesSalvos: any[] = [];
  sugestoes: any[] = [];
  isBrowser = false;

  constructor(private fb: FormBuilder, @Inject(PLATFORM_ID) private platformId: Object, private tmdService: TmdbService) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      nota: [null, [ Validators.min(1), Validators.max(10)]],
      comentario: ['']
    });
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('favoritos');
      if (dados) {
        this.filmesSalvos = JSON.parse(dados);
      }
    }

    this.form.get('titulo')?.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((texto: string) => {
          if (texto.length < 2) return of([]);
          return this.tmdService.buscarFilmes(texto);
        })
      ).subscribe((res: any) => {
        this.sugestoes = res.results.slice(0, 5); // pega até 5 sugestões
      });
  }

  selecionarFilme(filme: any) {
    this.form.patchValue({ titulo: filme.title });
    this.sugestoes = [];
  }

  salvar() {
    if (this.form.invalid) return;

    const novoFilme = this.form.value;
    this.filmesSalvos.push(novoFilme);
    if (this.isBrowser) {
      localStorage.setItem('favoritos', JSON.stringify(this.filmesSalvos));
    }
    this.form.reset();
    this.sugestoes = [];
  }

  ocultarSugestoesComDelay() {
  setTimeout(() => {
    this.sugestoes = [];
  }, 100);
}
}
