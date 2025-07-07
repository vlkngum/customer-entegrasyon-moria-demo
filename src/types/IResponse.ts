export interface IResponse<T> {
    code: number;
    status: string;
    timestamp: string;
    request_id: string;
    path: string;
    method: string;
    environment: string;
    duration_ms: number;
    locale: string;
    user_agent: string;
    device: string;
    user_id?: string;
    performance_tag: string;
    test_mode: boolean;
    ip: string;
    response_node: string;
    message: string;
    data: T;
}