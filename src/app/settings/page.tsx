'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import {
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  FormGroup,
  FormLabel,
  FormInput,
  SubmitButton,
  AuthForm,
  ErrorMessage,
} from '../components/StyledComponents';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      marketing: false,
    },
    theme: 'light',
    language: 'en',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checkbox.checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Here you would typically make an API call to update the settings
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    }
  };

  return (
    <MainLayout>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Account Settings</SectionTitle>
          </SectionHeader>
          <AuthForm onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

            <FormGroup>
              <FormLabel>Display Name</FormLabel>
              <FormInput
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Current Password</FormLabel>
              <FormInput
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>New Password</FormLabel>
              <FormInput
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Confirm New Password</FormLabel>
              <FormInput
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Theme</FormLabel>
              <FormInput
                as="select"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </FormInput>
            </FormGroup>

            <FormGroup>
              <FormLabel>Language</FormLabel>
              <FormInput
                as="select"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </FormInput>
            </FormGroup>

            <FormGroup>
              <FormLabel>Notification Preferences</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label>
                  <input
                    type="checkbox"
                    name="email"
                    checked={formData.notifications.email}
                    onChange={handleInputChange}
                  />
                  Email Notifications
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="push"
                    checked={formData.notifications.push}
                    onChange={handleInputChange}
                  />
                  Push Notifications
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={formData.notifications.marketing}
                    onChange={handleInputChange}
                  />
                  Marketing Emails
                </label>
              </div>
            </FormGroup>

            <SubmitButton type="submit">Save Changes</SubmitButton>
          </AuthForm>
        </Section>
      </MainContent>
    </MainLayout>
  );
}
