import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinElementComponent } from './coin-element.component';

describe('CoinElementComponent', () => {
  let component: CoinElementComponent;
  let fixture: ComponentFixture<CoinElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinElementComponent]
    });
    fixture = TestBed.createComponent(CoinElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
