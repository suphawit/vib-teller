import { TestBed, inject } from '@angular/core/testing';

import { PreviewPdfService } from './preview-pdf.service';

describe('PreviewPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviewPdfService]
    });
  });

  it('should be created', inject([PreviewPdfService], (service: PreviewPdfService) => {
    expect(service).toBeTruthy();
  }));
});
