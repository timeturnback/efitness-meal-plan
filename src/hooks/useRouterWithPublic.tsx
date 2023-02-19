import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SimpleLoading } from '@/components/loading';
import { AuthStateChangedContext } from '@/context/auth-state-changed-context';

export const WithPublic = (Component: () => JSX.Element) => {
  return function Public() {
    const { useraccountinfo } = useContext(AuthStateChangedContext);
    const [count, setCount] = useState(false);
    const router = useRouter();
    useEffect(() => {
      if (useraccountinfo.email) {
        router.replace('/');
        setCount(false);
      } else setCount(true);
    }, [useraccountinfo, count]);
    return count ? <Component /> : <SimpleLoading />;
  };
};
