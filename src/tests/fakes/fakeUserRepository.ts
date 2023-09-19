import { User } from "../../application/User/domain/User";

export class FakeUserRepository {
    private users: User[] = [
        new User(
            "test",
            "test@test.com",
            "123456",
            "1"

        )


    ];
    async create(user: any): Promise<any> {
        const existingUser = this.users.find(u => u.email === user.email);
        if (existingUser) {
            throw new Error("Email already taken");
        }
        let newUser = new User(user.name, user.email, user.password, user.id)
        this.users.push(newUser);
        return newUser;
    }
    async findById(id: string) {
        let user = this.users.find(u => u.id === id);
        return user ? user : null
    }
    async findByEmail(email: string) {
        let user = this.users.find(u => u.email === email);
        return user ? user : null
    }
}