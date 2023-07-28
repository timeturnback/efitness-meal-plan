import 'firebase/compat/auth';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { listAll, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import { dbg, storage } from '@/components/firebase';
import type { SelectOptionsDataExercise } from '@/constants/select-options';
import { ApiInstance } from '@/utils/api';

interface MainProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  calculatenow: boolean;
  setCalculateNow: Dispatch<SetStateAction<boolean>>;

  pathname: string;

  // leaves1: MutableRefObject<null>;
  // leaves2: MutableRefObject<null>;

  exerciseimagezoom: string;
  setExerciseImageZoom: Dispatch<SetStateAction<string>>;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [calculatenow, setCalculateNow] = useState(true);
  const [exerciseimagezoom, setExerciseImageZoom] = useState('');

  const { pathname } = useRouter();
  const router = useRouter();
  // const leaves1 = useScrollReveal({ origin: 'left' });
  // const leaves2 = useScrollReveal({ origin: 'bottom' });

  useEffect(() => {
    const handle = async () => {
      const docRef = doc(dbg, 'CloudSimpleHealthPlan', 'All Exercises');
      const isCheck = await getDoc(docRef);
      if (!isCheck.exists()) {
        const exercises: SelectOptionsDataExercise[] =
          await ApiInstance.getExerciseGetAllExercises();
        await setDoc(docRef, { exercises }, { merge: true });
      }
    };

    handle();
  }, []);

  useEffect(() => {
    const handle = async () => {
      const imgRef = ref(storage, 'ImagesExercises/');
      const value = await listAll(imgRef);
      if (value.items.length === 0) {
        const exercises: SelectOptionsDataExercise[] =
          await ApiInstance.getExerciseGetAllExercises();
        const uploadPromises = exercises.map(async (item) => {
          try {
            const response = await fetch(item.gifUrl);
            const gifData = await response.arrayBuffer();
            const gifUint8Array = new Uint8Array(gifData);
            const imageRef = ref(storage, `ImagesExercises/${item.id}`);
            await uploadBytes(imageRef, gifUint8Array);
          } catch (error) {
            //
          }
        });
        await Promise.all(uploadPromises);
      }
    };
    handle();
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('reloaded') !== null) {
      //
    }
    sessionStorage.setItem('reloaded', 'yes');
  }, []);

  useEffect(() => {
    const handlerStart = (url: any) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handlerComplete = (url: any) => {
      if (url === router.asPath) {
        setInterval(() => {
          setLoading(false);
        }, 800);
      }
    };
    router.events.on('routeChangeStart', handlerStart);
    router.events.on('routeChangeComplete', handlerComplete);
    return () => {
      router.events.off('routeChangeStart', handlerStart);
      router.events.off('routeChangeComplete', handlerComplete);
    };
  });

  const value = {
    loading,
    setLoading,
    calculatenow,
    setCalculateNow,
    pathname,
    // leaves1,
    // leaves2,
    exerciseimagezoom,
    setExerciseImageZoom,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
