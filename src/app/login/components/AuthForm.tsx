import React from 'react';
import styled from 'styled-components';
import { Form, InputGroup, Input, SubmitButton, ForgotPassword } from './styles';

interface AuthFormProps {
  isSignUp: boolean;
  isLoading: boolean;
  formData: {
    email: string;
    password: string;
    displayName: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignUp,
  isLoading,
  formData,
  onInputChange,
  onSubmit,
  onForgotPassword,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      {isSignUp && (
        <InputGroup>
          <Input
            type="text"
            name="displayName"
            placeholder="Full Name"
            value={formData.displayName}
            onChange={onInputChange}
            required={isSignUp}
          />
        </InputGroup>
      )}
      <InputGroup>
        <Input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={onInputChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onInputChange}
          required
          minLength={6}
        />
      </InputGroup>
      {!isSignUp && (
        <ForgotPassword type="button" onClick={onForgotPassword}>
          Forgot password?
        </ForgotPassword>
      )}
      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Log In'}
      </SubmitButton>
    </Form>
  );
};

export default AuthForm;
