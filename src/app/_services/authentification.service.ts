import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private tokenStorage: TokenStorageService) { }

  public ser(): any {
    return this.tokenStorage.getUser();
   }
}
