import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IndexComponent } from './index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockHistoryApiService } from 'src/test/mocks/services/mock-history-api.service';
import { HistoryApiService } from 'src/app/services/history-api/history-api.service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: HistoryApiService, useClass: MockHistoryApiService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    // @ts-ignore
    component.initForm();
    expect(component.f.eventType.value).toBeNull();
    expect(component.f.dayFrom.value).toBeNull();
    expect(component.f.monthFrom.value).toBeNull();
    expect(component.f.dayTo.value).toBeNull();
    expect(component.f.monthTo.value).toBeNull();
  });

  it('should load events', () => {
    // @ts-ignore
    component.loadEvents();
    expect(component.events[0].year).toEqual("1112");
  });
});
