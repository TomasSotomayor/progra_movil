import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaviajePage } from './listaviaje.page';

describe('ListaviajePage', () => {
  let component: ListaviajePage;
  let fixture: ComponentFixture<ListaviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
