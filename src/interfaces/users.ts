export interface Users{
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role_id?: number;
}

export const defaultUser: Users = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    role_id: 0
};