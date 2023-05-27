import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: 'simplehealthplan-b5d05',
  messagingSenderId: '39095286951',
  // ...
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const myFirebase = firebase;
export default myFirebase;

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export function orSignIn() {
  return (
    <>
      <div className="mt-2 text-center">OR</div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}

export const AuthService = {
  createUser: async ({
    email,
    password,
    firstname,
    lastname,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    user.user?.updateProfile({
      displayName: `${firstname} - ${lastname}`,
    });
    await user.user?.sendEmailVerification();
    return user;
  },
  checkEmailUser: async (email: string) => {
    const result = await firebase.auth().fetchSignInMethodsForEmail(email);
    return result;
  },
  signOut: async () => {
    await firebase.auth().signOut();
  },
  resetPassword: async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  },
  loginUser: async (email: string, password: string) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      return {
        user: user.user,
      };
    } catch (e: any) {
      return {
        error: e.code,
      };
    }
  },
  sendAConfirmationEmail: async () => {
    await firebase.auth().currentUser?.reload();
    await firebase.auth().currentUser?.sendEmailVerification();
  },
  checkPassword: async (email: string, password: string) => {
    const response = await fetch('/api/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    return data;
  },
  updatePassword: async (user: firebase.User, newpassword: string) => {
    return user.updatePassword(newpassword);
  },
};
