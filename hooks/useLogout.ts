import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { API_ROUTES } from 'types/shared/api';
import useFetchApi from 'hooks/useFetchApi';
import useNotificationStore from 'stores/notification';
import { NOTIFICATION_TYPE } from 'types/shared/notification';
import useSettingsStore from 'stores/settings';
import { fallbackString } from 'utils/text';

const useLogout = () => {
  const fetchApi = useFetchApi();
  const router = useRouter();
  const send = useNotificationStore((store) => store.send);
  const lang = useSettingsStore((state) => state.settings?.lang);
  const logoutSuccess = fallbackString(
    lang?.account?.logout?.success,
    "You're logged out",
  );

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
