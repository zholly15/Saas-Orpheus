import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
describe('MessageService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MessageService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=message.service.spec.js.map