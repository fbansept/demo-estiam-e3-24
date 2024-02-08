import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur.type';

@Component({
  selector: 'app-edition-utilisateur',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './edition-utilisateur.component.html',
  styleUrl: './edition-utilisateur.component.scss',
})
export class EditionUtilisateurComponent {
  httpClient = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  formBuilder = inject(FormBuilder);

  idUtilisateurModifie?: number;

  ngOnInit() {
    this.route.params.subscribe((parametres) => {
      if (parametres['id']) {
        const id = parseInt(parametres['id']);

        if (!isNaN(id)) {
          this.httpClient
            .get('http://localhost:8080/personne/' + id)
            .subscribe((utilisateur) => {
              this.idUtilisateurModifie = id;
              this.formulaire.patchValue(utilisateur);
            });
        }
      }
    });
  }

  formulaire = this.formBuilder.group({
    prenom: ['', [Validators.required]],
    nom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required]],
  });

  onAjoutUtilisateur() {
    if (this.formulaire.valid) {

      const utilisateur: Utilisateur = {
        id: this.idUtilisateurModifie,
        admin: false,
        email: this.formulaire.value.email ?? '',
        nom: this.formulaire.value.nom ?? '',
        prenom: this.formulaire.value.prenom ?? ''
      };

      this.httpClient
        .post('http://localhost:8080/personne', utilisateur)
        .subscribe(() => this.router.navigate(['gestion-utilisateurs']));
    }
  }
}
