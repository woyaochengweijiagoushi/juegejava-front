import { reactive, provide, inject } from "vue";

type PortalService = Record<string, boolean>;

export const useCreatePortalService = (initData: PortalService) => {
  const portalService = reactive(initData);
  provide("portalService", portalService);
  return portalService;
};

export const useInjectPortalSerivce = () => {
  return inject<PortalService>("portalService");
};
