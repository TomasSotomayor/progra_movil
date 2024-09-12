import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarvehiculoPage } from './listarvehiculo.page';

describe('ListarvehiculoPage', () => {
  let component: ListarvehiculoPage;
  let fixture: ComponentFixture<ListarvehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarvehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
