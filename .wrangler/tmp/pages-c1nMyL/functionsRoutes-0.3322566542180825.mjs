import { onRequestGet as __api_test_openai_ts_onRequestGet } from "/Users/panzhaoning/Downloads/execu-ai-hub-main/functions/api/test-openai.ts"
import { onRequestPost as __api_write_ts_onRequestPost } from "/Users/panzhaoning/Downloads/execu-ai-hub-main/functions/api/write.ts"

export const routes = [
    {
      routePath: "/api/test-openai",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_test_openai_ts_onRequestGet],
    },
  {
      routePath: "/api/write",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_write_ts_onRequestPost],
    },
  ]