import { TestBed } from '@angular/core/testing';

import { TaskServiceService } from './task-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: TaskServiceService = TestBed.get(TaskServiceService);
    expect(service).toBeTruthy();
  });
});
