import type { ORDER } from "./Order";

export interface TABLE{
    _id: string;
    number: string;
    status: TABLE_STATUS;
    adminId: string;
}

export interface TABLE_WITH_ORDERS extends TABLE {
    orders: ORDER[];
}

export type TABLE_STATUS = 'empty' |  'occupied' | 'reserved';
