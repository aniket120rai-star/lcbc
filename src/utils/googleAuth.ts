import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  type User,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
for (const scope of SCOPES) {
  googleProvider.addScope(scope);
}
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

let isSigningIn = false;
// Cache the OAuth access token strictly in memory (never localStorage/sessionStorage).
let cachedAccessToken: string | null = null;

export interface GoogleGmailProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  accessToken: string | null;
}

export function initGoogleAuth(
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user && cachedAccessToken) {
      onAuthSuccess?.(user, cachedAccessToken);
    } else if (!isSigningIn) {
      if (!user) {
        cachedAccessToken = null;
      }
      onAuthFailure?.();
    }
  });
}

export function getGoogleAccessToken(): string | null {
  return cachedAccessToken;
}

interface PeopleApiResponse {
  names?: { displayName?: string }[];
  emailAddresses?: { value?: string }[];
  photos?: { url?: string; default?: boolean }[];
}

export async function googleSignInWithGmail(): Promise<GoogleGmailProfile> {
  isSigningIn = true;
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken ?? null;
    cachedAccessToken = accessToken;

    let name = result.user.displayName?.trim() || '';
    let email = result.user.email?.trim() || '';
    let avatarUrl = result.user.photoURL?.trim() || undefined;

    if (accessToken) {
      try {
        const res = await fetch(
          'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (res.ok) {
          const data = (await res.json()) as PeopleApiResponse;
          const apiName = data.names?.[0]?.displayName?.trim();
          const apiEmail = data.emailAddresses?.[0]?.value?.trim();
          const apiPhoto =
            data.photos?.find((p) => !p.default)?.url?.trim() ??
            data.photos?.[0]?.url?.trim();

          if (apiName) name = apiName;
          if (apiEmail) email = apiEmail;
          if (apiPhoto) avatarUrl = apiPhoto;
        }
      } catch {
        // Fallback smoothly to Firebase Auth profile fields
      }
    }

    if (!name && email) {
      name = email.split('@')[0];
    }

    return {
      name: name || 'LCB Student',
      email,
      avatarUrl,
      accessToken,
    };
  } catch (err: unknown) {
    const code =
      typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: unknown }).code)
        : '';
    if (code === 'auth/popup-closed-by-user') {
      throw new Error('Google sign-in popup was closed before finishing.');
    }
    if (code === 'auth/popup-blocked') {
      throw new Error('Popup blocked by browser. Please allow popups for Google sign-in.');
    }
    if (code === 'auth/cancelled-popup-request') {
      throw new Error('Sign-in popup was superseded. Please try again.');
    }
    throw new Error('Could not complete Google sign-in. Please verify popup permissions and try again.');
  } finally {
    isSigningIn = false;
  }
}

export async function googleSignOut(): Promise<void> {
  cachedAccessToken = null;
  try {
    await auth.signOut();
  } catch {
    // Ignore sign-out errors if user was signed in locally
  }
}
