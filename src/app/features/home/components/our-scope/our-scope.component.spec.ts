import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurScopeComponent } from './our-scope.component';

describe('OurScopeComponent', () => {
  let component: OurScopeComponent;
  let fixture: ComponentFixture<OurScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurScopeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
