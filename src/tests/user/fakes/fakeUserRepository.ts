

export class FakeUserRepository {
    async create(user: any): Promise<any> {
        return user;
    }
}