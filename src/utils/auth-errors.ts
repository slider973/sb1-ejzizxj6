import type { AuthError } from '@supabase/supabase-js'

export function getAuthErrorMessage(error: AuthError | Error): string {
  if ('message' in error) {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Email ou mot de passe incorrect'
      case 'User already registered':
        return 'Cette adresse email est déjà utilisée'
      case 'Invalid email':
        return 'Veuillez entrer une adresse email valide'
      case 'Password is too short':
        return 'Le mot de passe doit contenir au moins 6 caractères'
      default:
        return error.message || 'Une erreur est survenue'
    }
  }
  return 'Une erreur est survenue'
}