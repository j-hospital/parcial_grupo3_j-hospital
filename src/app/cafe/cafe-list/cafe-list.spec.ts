import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe-service';
import { CafeList } from './cafe-list';

describe('CafeList', () => {
  let component: CafeList;
  let fixture: ComponentFixture<CafeList>;

  const cafesDePrueba: Cafe[] = [
    new Cafe(1, 'Café Uno', 'Blend', 'Región Uno', 'Dulce', 1500, 'url1'),
    new Cafe(2, 'Café Dos', 'Café de Origen', 'Región Dos', 'Frutal', 1700, 'url2'),
    new Cafe(3, 'Café Tres', 'Blend', 'Región Tres', 'Achocolatado', 1600, 'url3'),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CafeList],
      providers: [
        {
          provide: CafeService,
          useValue: { getCafes: vi.fn().mockReturnValue(of(cafesDePrueba)) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CafeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a table with 3 rows plus the header', () => {
    const element: HTMLElement = fixture.nativeElement;

    const filasEncabezado = element.querySelectorAll('thead tr');
    const filasDatos = element.querySelectorAll('tbody tr');
    const todasLasFilas = element.querySelectorAll('table tr');

    expect(filasEncabezado.length).toBe(1);
    expect(filasDatos.length).toBe(3);
    expect(todasLasFilas.length).toBe(4);
  });
});