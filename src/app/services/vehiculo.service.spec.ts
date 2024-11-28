import { TestBed } from '@angular/core/testing';

import { VehiculoService } from './vehiculo.service';
import { provideHttpClient } from '@angular/common/http';

describe('VehiculoService', () => {
  let service: VehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(VehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
