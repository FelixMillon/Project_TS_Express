import { User } from './user';

export interface UserService{
    add(username: string, email:string, password:string): Promise<User | null>;
    getById(id: number): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    delete(id: number): Promise<boolean>;
    updateUser(id: number,name: string,email: string): Promise<boolean>;
    updatePassword(id: number, password: string): Promise<boolean>;
}