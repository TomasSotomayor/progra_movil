import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [provideHttpClient()]
    });
    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
