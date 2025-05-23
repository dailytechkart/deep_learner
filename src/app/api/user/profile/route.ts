import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Force dynamic route handling
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    console.log('Fetching session...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('Session error:', sessionError);
      return NextResponse.json(
        { error: 'Authentication error', details: sessionError.message },
        { status: 401 }
      );
    }

    if (!session?.user) {
      console.log('No session or user found');
      return NextResponse.json(
        { error: 'No authenticated user found' },
        { status: 401 }
      );
    }

    console.log('Fetching profile for user:', session.user.id);
    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch profile data', details: profileError.message },
        { status: 500 }
      );
    }

    // If no profile exists, create one
    if (!profile) {
      console.log('No profile found, creating new profile...');
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: session.user.id,
          email: session.user.email,
          created_at: new Date().toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: 'English',
        })
        .select()
        .single();

      if (createError) {
        console.error('Profile creation error:', createError);
        return NextResponse.json(
          { error: 'Failed to create profile', details: createError.message },
          { status: 500 }
        );
      }

      console.log('New profile created:', newProfile);
      return NextResponse.json({
        id: session.user.id,
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
        email: session.user.email,
        image: session.user.user_metadata?.avatar_url,
        ...newProfile,
      });
    }

    console.log('Profile found:', profile);
    // Return the user profile data
    return NextResponse.json({
      id: session.user.id,
      name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
      email: session.user.email,
      image: session.user.user_metadata?.avatar_url,
      ...profile,
    });
  } catch (error) {
    console.error('Unexpected error in profile route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
