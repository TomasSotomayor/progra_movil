import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarvehiculo',
  templateUrl: './agregarvehiculo.page.html',
  styleUrls: ['./agregarvehiculo.page.scss'],
})
export class AgregarvehiculoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


    // Método para manejar el botón "Volver"
    volverButton() {
      this.router.navigateByUrl('/vehiculo');
    }
}
