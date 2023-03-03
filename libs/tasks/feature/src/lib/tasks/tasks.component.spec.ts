import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '@task-manager/shared/config';

import { TasksComponent } from './tasks.component';

describe('FeatureComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent],
      providers: [{ provide: APP_CONFIG, useValue: 'test config' }]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
