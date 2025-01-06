import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartbadgeComponent } from './cartbadge.component';

describe('CartbadgeComponent', () => {
  let component: CartbadgeComponent;
  let fixture: ComponentFixture<CartbadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartbadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartbadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
