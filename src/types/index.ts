export type Subject = {
    id: number;
    name: string;
    code: string;
    description: string;
    department: string;
    createdAt: string;
}

export interface ListResponse<T = any> {
    data: T[];
    pagination?: {
        total?: number;
        page?: number;
        limit?: number;
    };
}

export interface CreateResponse<T = any> {
    data: T;
}

export interface GetOneResponse<T = any> {
    data: T;
}
