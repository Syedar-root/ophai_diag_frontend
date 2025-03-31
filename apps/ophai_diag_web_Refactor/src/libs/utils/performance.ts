export const initPerformanceMonitor = () => {
  const perf = window.performance;
  
  // 关键时间节点记录
  perf.mark('vue-app-start');

  return {
    getFirstPaintTime: () => {
      const [paintEntry] = perf.getEntriesByType('paint');
      return paintEntry?.startTime || 0;
    },
    getFirstContentfulPaint: () => {
      const [navigationEntry] = perf.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const fcp = perf.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
      return navigationEntry ? fcp - navigationEntry.startTime : 0;
    },
    sendMetrics: (metrics: object) => {
      // 后续可扩展为发送到监控平台
      console.log('[Performance]', metrics);
    }
  };
};
