import { Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { GestionUtilisateursComponent } from './pages/gestion-utilisateurs/gestion-utilisateurs.component';
import { EditionUtilisateurComponent } from './pages/edition-utilisateur/edition-utilisateur.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gestion-utilisateurs', component: GestionUtilisateursComponent },
  { path: 'edition-utilisateur', component: EditionUtilisateurComponent },
  { path: 'edition-utilisateur/:id', component: EditionUtilisateurComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: Page404Component },
];
