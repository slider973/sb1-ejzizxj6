import type { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'User already registered':
      return 'This email is already registered';
    case 'Invalid email':
      return 'Please enter a valid email address';
    case 'Signup disabled':
      return 'Sign up is currently disabled';
    case 'Password is too short':
      return 'Please choose a stronger password';
    default:
      return error.message || 'An error occurred. Please try again';
  }
}