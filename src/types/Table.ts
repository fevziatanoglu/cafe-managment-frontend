export interface TABLE{
    _id: string;
    number: string;
    status: TABLE_STATUS;
    adminId: string;
}

export type TABLE_STATUS = 'empty' |  'occupied' | 'reserved';
