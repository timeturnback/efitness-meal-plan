import { doc, getDoc } from 'firebase/firestore';

import { dbg } from '@/components/firebase';

export const UseGetListExercises = async () => {
  const docRef = await getDoc(
    doc(dbg, 'CloudSimpleHealthPlan', 'All Exercises')
  );
  return docRef.data()?.exercises;
};
