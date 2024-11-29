import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiculoPage } from './vehiculo.page';
import { provideHttpClient } from '@angular/common/http';

describe('VehiculoPage', () => {
  let component: VehiculoPage;
  let fixture: ComponentFixture<VehiculoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })
    fixture = TestBed.createComponent(VehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
