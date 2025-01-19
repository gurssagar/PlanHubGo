import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const email = sessionStorage.getItem('email');
  const role = sessionStorage.getItem('role');  // Get the stored role from sessionStorage

  // Ensure the user is logged in and that the role matches the required role for the route
  if (email && role) {
    if (route.data['role'] && route.data['role'] !== role) {
      const router = inject(Router);
      router.navigate(['home']);  // Redirect if the role doesn't match the required one
      return false;
    }
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['login']);
    return false;  // Redirect to login if no email or role found
  }
};
