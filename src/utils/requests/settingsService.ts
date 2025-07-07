import { IResponse } from "@/types/IResponse";
import { ServiceTemplate, PaginatedResponse } from "@/types/Ecommerce";
import useRequest from './useRequest';

export const settingsService = {
    getServiceTemplates: async (bearer: string): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
        return await useRequest.requests.getHeader<IResponse<PaginatedResponse<ServiceTemplate>>>(`customer/service-templates`, bearer);
    },
};
