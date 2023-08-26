

export class FakeUserRepository {
    async create(user: any): Promise<any> {
        return user;
    }
    async findById(id: string) {
        return {
            id: id,
            email: "test@test.com",
            password: "123456",
            name: "some_name"
        }
    }
    async findByEmail(email: string) {
        return {
            id: "1",
            email: email,
            password: "123456",
            name: "some_name"
        }
    }
}