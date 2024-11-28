import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarvehiculoPage } from './agregarvehiculo.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('AgregarvehiculoPage', () => {
  let component: AgregarvehiculoPage;
  let fixture: ComponentFixture<AgregarvehiculoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [provideHttpClient()]
    })
    fixture = TestBed.createComponent(AgregarvehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
