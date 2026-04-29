// app/plugins/sentry.client.ts
import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  // 從環境變數抓取 DSN
  const config = useRuntimeConfig();

  const dsn = config.public.sentryDsn;

  if (!dsn) {
    console.warn("Sentry DSN 不存在，請檢查 .env 檔案");
    return;
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn: dsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // 效能監控採樣率 (開發環境建議 1.0)
    tracesSampleRate: 1.0,
    // 錄影功能設定
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
});
