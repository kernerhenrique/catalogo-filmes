import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { GeneroComponent } from './pages/genero/genero.component';

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
    }
];
