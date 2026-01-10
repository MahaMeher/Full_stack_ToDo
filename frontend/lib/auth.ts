// Mock auth implementation that uses the backend's auth endpoint to generate tokens
// This simulates the auth functions that would come from Better Auth

export interface Session {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  jwtToken: string;
}

export async function getSession(): Promise<Session | null> {
  if (typeof window !== 'undefined') {
    const sessionData = localStorage.getItem('userSession');
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData);
        return {
          user: {
            id: userData.id,
            email: userData.email,
            name: userData.name,
          },
          jwtToken: userData.jwtToken || '',
        };
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
  }
  return null;
}

export async function signIn(email: string, password: string): Promise<{ user: any; error: any }> {
  try {
    // In development, use the backend's auth endpoint to generate a valid token
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
        name: email.split('@')[0],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.statusText}`);
    }

    const data = await response.json();

    const user = {
      id: data.user_id,
      email,
      name: email.split('@')[0],
    };

    const session = {
      user,
      jwtToken: data.access_token,
    };

    // Store session in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSession', JSON.stringify(session));
    }

    return { user: session.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function signUp(name: string, email: string, password: string): Promise<{ user: any; error: any }> {
  try {
    // In development, use the backend's auth endpoint to generate a valid token
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    const response = await fetch(`${baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
        name: name,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate token: ${response.statusText}`);
    }

    const data = await response.json();

    const user = {
      id: data.user_id,
      email,
      name,
    };

    const session = {
      user,
      jwtToken: data.access_token,
    };

    // Store session in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('userSession', JSON.stringify(session));
    }

    return { user: session.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function signOut(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userSession');
  }
}