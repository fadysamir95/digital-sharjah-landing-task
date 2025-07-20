import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneConnectedGovernmentComponent } from './one-connected-government.component';

describe('OneConnectedGovernmentComponent', () => {
  let component: OneConnectedGovernmentComponent;
  let fixture: ComponentFixture<OneConnectedGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneConnectedGovernmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneConnectedGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
