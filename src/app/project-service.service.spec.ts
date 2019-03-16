import { TestBed } from '@angular/core/testing';

import { ProjectServiceService } from './project-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ProjectServiceService = TestBed.get(ProjectServiceService);
    expect(service).toBeTruthy();
  });
});
