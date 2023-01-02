import React, { useMemo } from 'react';
import useSettingsStore from 'stores/settings';
import type { Status } from 'types/global';
import { STATUS_MAP } from 'utils/status';

export interface StatusIndicatorProps {
  status: Status;
  payload?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  payload,
}) => {
  const lang = useSettingsStore((state) => state.settings?.lang);
  const template = useMemo(() => STATUS_MAP(lang).get(status), [status, lang]);
  return (
    <div className="inline-flex items-center gap-[6px] rounded-lg bg-background-secondary px-2 py-1">
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: template?.color }}></div>
      <span className="text-2xs font-medium text-primary">
        {template?.label}
        {!!template?.details && (
          <>
            <span className="mx-1">•</span>
            <span className="text-3xs font-normal">
              {template.details(payload)}
            </span>
          </>
        )}
      </span>
    </div>
  );
};

export default StatusIndicator;
