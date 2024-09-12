import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaviajesPage } from './listaviajes.page';

describe('ListaviajesPage', () => {
  let component: ListaviajesPage;
  let fixture: ComponentFixture<ListaviajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
