import { User } from '../models/user';

const customers: User[] = [];

async function getUser(id: number): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        return resolve(customers.find(c => c.id === id));
    })
}

async function getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
        return resolve(customers);
    })
}
async function addUser(customer: User): Promise<User> {
    return new Promise((resolve, reject) => {
        if (!customer.firstName || !customer.email)
            return reject(new Error(`Invalid customer.`));

        const newUser = ({ firstName: customer.firstName, email: customer.email });
        customers.push(newUser);

        return resolve(newUser);
    })
}

async function updateUser(id: number, newUser: User): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index >= 0) {
            if (newUser.firstName && customers[index].firstName !== newUser.firstName)
                customers[index].firstName = newUser.firstName;

            if (newUser.email && customers[index].email !== newUser.email)
                customers[index].email = newUser.email;

            return resolve(customers[index]);
        }

        return resolve(undefined);
    })
}

async function deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const index = customers.findIndex(c => c.id === id);
        if (index >= 0) {
            customers.splice(index, 1);
            return resolve(true);
        }

        return resolve(false);
    })
}

export default {
    getUser,
    getUsers,
    deleteUser,
    addUser,
    updateUser
}