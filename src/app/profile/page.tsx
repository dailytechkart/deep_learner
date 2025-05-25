'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { CustomUser } from '@/types/auth';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  Card,
  CardTitle,
  CardContent,
  ProfileSection,
  FormGroup,
  FormLabel as Label,
  FormInput as Input,
  Select,
  SubmitButton as Button,
} from '../components/StyledComponents';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { withAuth } from '../hooks/withAuth';
import MainLayout from '@/components/MainLayout';

function ProfilePage() {
  const { user } = useAuth() as { user: CustomUser | null };
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    joinDate: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    timezone: 'UTC',
    language: 'en',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.statusText}`);
        }

        const data = await response.json();
        setProfileData(prev => ({
          ...prev,
          displayName: data.name || user?.user_metadata?.full_name || '',
          email: data.email || user?.email || '',
          joinDate: data.created_at || new Date().toISOString(),
          lastActive: data.last_sign_in_at || new Date().toISOString(),
          timezone: data.timezone || 'UTC',
          language: data.language || 'en',
        }));
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <MainLayout>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/profile' },
        ]}
      />
      <ProfileContainer>
        <ProfileHeader>
          <ProfileAvatar $src={user?.user_metadata?.avatar_url} />
          <div>
            <ProfileName>{profileData.displayName}</ProfileName>
            <ProfileEmail>{profileData.email}</ProfileEmail>
          </div>
        </ProfileHeader>

        <ProfileSection>
          <Card>
            <CardTitle>Account Information</CardTitle>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Member Since</Label>
                  <div>{new Date(profileData.joinDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <Label>Last Active</Label>
                  <div>{new Date(profileData.lastActive).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ProfileSection>

        <ProfileSection>
          <Card>
            <CardTitle>Profile Settings</CardTitle>
            <CardContent>
              <FormGroup>
                <Label>Display Name</Label>
                <Input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setProfileData(prev => ({ ...prev, displayName: e.target.value }))
                  }
                  disabled={!isEditing}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input type="email" value={profileData.email} disabled />
              </FormGroup>
              <FormGroup>
                <Label>Timezone</Label>
                <Select
                  value={profileData.timezone}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setProfileData(prev => ({ ...prev, timezone: e.target.value }))
                  }
                  disabled={!isEditing}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Language</Label>
                <Select
                  value={profileData.language}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setProfileData(prev => ({ ...prev, language: e.target.value }))
                  }
                  disabled={!isEditing}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </Select>
              </FormGroup>
              {isEditing ? (
                <Button onClick={handleSave}>Save Changes</Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
            </CardContent>
          </Card>
        </ProfileSection>
      </ProfileContainer>
    </MainLayout>
  );
}

export default withAuth(ProfilePage);
