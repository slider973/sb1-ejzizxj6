import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { AuthForm } from './AuthForm';
import { signUp } from '../../utils/auth';
import { validateEmail, validatePassword } from '../../utils/validation';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid) {
      setError(emailValidation.error!);
      return;
    }

    if (!passwordValidation.isValid) {
      setError(passwordValidation.error!);
      return;
    }

    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  return (
    <AuthLayout title="Create Account">
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        error={error}
        submitText="Sign Up"
      >
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </AuthForm>
    </AuthLayout>
  );
}