import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { API_ROUTES } from 'types/shared/api';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import useI18n from './useI18n';

const useLogout = () => {
  const fetchApi = useFetchApi();
  const router = useRouter();
  const send = useNotificationStore((store) => store.send);
  const i18n = useI18n();
  const logoutSuccess = i18n('account.logout.success');

  const responseCallback = useCallback(
    (res: Response) => {
      if (res.status === 200) {
        router.push('/');
        send({
          message: logoutSuccess,
          type: NOTIFICATION_TYPE.INFO,
        });
      }
    },
    [router, send, logoutSuccess],
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
