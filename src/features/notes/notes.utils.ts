import type { MessageKey } from "../../i18n/messages";

type TFn = (key: MessageKey, vars?: Record<string, string | number>) => string;

export function formatRelativeTime(date: string, t: TFn) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return t("time_justNow");
  if (minutes < 60) return t("time_minutesAgo", { count: minutes });

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("time_hoursAgo", { count: hours });

  const days = Math.floor(hours / 24);
  return t("time_daysAgo", { count: days });
}
