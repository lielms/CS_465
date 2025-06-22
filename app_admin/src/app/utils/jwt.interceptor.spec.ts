import { TestBed } from '@angular/core/testing';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';

describe('JwtInterceptor', () => {
  let interceptor: JwtInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
    interceptor = new JwtInterceptor(TestBed.inject(AuthenticationService));
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});