import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private router: Router) { }

  public errorCode(err) {
    console.log(err);
    switch (err.status) {
      case 0:
        alert('Server not ask! Please repeat this after 15 minutes');
        break;
      case 403:
        alert('You need to log in!');
        this.router.navigate([`/login`]);
        break;
      case 400:
        alert('Please repeat this after 15 minutes, error in server');
        this.router.navigate([`/login`]);
        break;
      default:
        alert('This is new error!');
    }
  }
}
