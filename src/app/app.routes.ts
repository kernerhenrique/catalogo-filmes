import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { MinhaListaComponent } from './pages/minha-lista/minha-lista.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'filme/:id',
        component: DetalhesFilmeComponent
    },
    {
        path: 'genero/:id',
        component: GeneroComponent
    },
    {
        path: 'minha-lista',
        component: MinhaListaComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    },
];
