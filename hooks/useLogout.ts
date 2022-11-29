import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { API_ROUTES } from 'types/shared/api';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';

const useLogout = () => {
  const fetchApi = useFetchApi();
  const router = useRouter();
  const send = useNotificationStore((store) => store.send);

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status === 200) {
        router.push('/account/login');
        // TODO: i18n
        send({
          message: "You're logged out",
          type: NOTIFICATION_TYPE.INFO,
        });
      }
    },
    [router, send],
  );

  return useCallback(
    () =>
      fetchApi(
        {
          url: API_ROUTES.LOGOUT,
          options: {
            method: 'POST',
          },
        },
        responseCallback,
      ),
    [fetchApi, responseCallback],
  );
};

export default useLogout;
