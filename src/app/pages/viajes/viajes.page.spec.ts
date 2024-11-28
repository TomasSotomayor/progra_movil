import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesPage } from './viajes.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ViajesPage', () => {
  let component: ViajesPage;
  let fixture: ComponentFixture<ViajesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [provideHttpClient()]
    });
    fixture = TestBed.createComponent(ViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
