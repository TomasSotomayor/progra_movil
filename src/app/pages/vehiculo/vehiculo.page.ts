import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit, OnDestroy {
  vehiculos: any[] = [];
  token: string | null = null;
  vehiculoSub: Subscription | null = null;

  constructor(
    private vehiculoService: VehiculoService,
    private router: Router,
    private renderer: Renderer2
  ) {
    // Inicializar Firebase
    initializeApp(environment.firebaseConfig);
  }

  ngOnInit() {
    this.removeAriaHiddenFromRouterOutlet();
    this.getTokenAndLoadVehicles();

    // Suscribirse a cambios en los vehículos
    this.vehiculoSub = this.vehiculoService.getVehiculoStream().subscribe((nuevoVehiculo) => {
      if (nuevoVehiculo) {
        this.vehiculos.push(nuevoVehiculo);
      }
    });
  }

  ngOnDestroy() {
    if (this.vehiculoSub) {
      this.vehiculoSub.unsubscribe();
    }
  }

  /**
   * Remueve el atributo aria-hidden del ion-router-outlet
   */
  removeAriaHiddenFromRouterOutlet() {
    const routerOutlet = document.querySelector('ion-router-outlet');
    if (routerOutlet) {
      this.renderer.removeAttribute(routerOutlet, 'aria-hidden');
    }
  }

  /**
   * Obtiene el token del usuario autenticado y carga los vehículos
   */
  getTokenAndLoadVehicles() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          this.token = await user.getIdToken();
          this.cargarVehiculos();
        } catch (error) {
          console.error('Error al obtener el token: ', error);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Carga los vehículos del usuario autenticado
   */
  async cargarVehiculos() {
    try {
      if (!this.token) {
        throw new Error('Token no encontrado');
      }

      const data = { p_id: 1, token: this.token };
      const req = await this.vehiculoService.obtenVehiculo(data);
      this.vehiculos = req;
    } catch (error) {
      console.error('Error al cargar vehículos: ', error);
    }
  }

  /**
   * Navega a la página para registrar un nuevo vehículo
   */
  navigateToPageRegistrarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
  }
}
