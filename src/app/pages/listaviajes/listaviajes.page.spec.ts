import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaviajesPage } from './listaviajes.page';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('ListaviajesPage', () => {
  let component: ListaviajesPage;
  let fixture: ComponentFixture<ListaviajesPage>;
  const mock = {
    snapshot: {
      params: { destino : 'idk' }
  }};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [{provide: ActivatedRoute, useValue: mock}, provideHttpClient()]
    });
    fixture = TestBed.createComponent(ListaviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
