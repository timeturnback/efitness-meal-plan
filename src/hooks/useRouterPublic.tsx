import 'firebase/compat/auth';

import type { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { SimpleLoading } from '@/components/loading';

export const RouterPublic = (
  Component: NextComponentType<NextPageContext, any, any>,
  handler: () => boolean
) => {
  return function WithPublic(props: any) {
    const router = useRouter();
    const { pathname } = router;
    if (handler()) {
      router.replace('/');
      return <SimpleLoading />;
    }
    return <Component pathname={pathname} {...props} />;
  };
};
