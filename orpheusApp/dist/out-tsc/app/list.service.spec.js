import { TestBed } from '@angular/core/testing';
import { ListService } from './list.service';
describe('ListService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ListService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=list.service.spec.js.map