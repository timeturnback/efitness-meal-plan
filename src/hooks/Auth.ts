import 'firebase/compat/auth';

import firebase from 'firebase/compat/app';
import router from 'next/router';
import { useContext } from 'react';

import { MainContext } from '@/context/main-context';

async function OnCreateUser(email: string, password: string) {
  const { setInfoCreateUser } = useContext(MainContext);
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  router.push(`/signup/verify?email=${user.user?.email}`);
  await user.user?.sendEmailVerification();
  setInfoCreateUser(user);
}

export default OnCreateUser;
