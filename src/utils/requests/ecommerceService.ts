import { IResponse } from "@/types/IResponse";
import { ServiceTemplate, PaginatedResponse } from "@/types/Ecommerce";
import useRequest from './useRequest';

export const ecommerceService = {
    getEntegrations: async (bearer: string): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
        return await useRequest.requests.getHeader<IResponse<PaginatedResponse<ServiceTemplate>>>(`customer/service-templates`, bearer);
    },
    postEntegration: async (bearer: string, data: object): Promise<IResponse<PaginatedResponse<ServiceTemplate>>> => {
        return await useRequest.requests.postHeader<IResponse<PaginatedResponse<ServiceTemplate>>>(`customer/user-integrations`, data, bearer);
    },
};
