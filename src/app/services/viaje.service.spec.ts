import { TestBed } from '@angular/core/testing';
import { ViajeService } from './viaje.service';
import { provideHttpClient } from '@angular/common/http';

describe('ViajeService', () => {
  let service: ViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient()]
    });
    service = TestBed.inject(ViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
