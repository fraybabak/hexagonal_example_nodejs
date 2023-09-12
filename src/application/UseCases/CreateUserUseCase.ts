import { UserCreatedEvent } from "../domain/UserEvent";
import { User } from "../domain/User";

export class CreateUserUseCase {

  execute(name: string, email: string, password: string, id?: string): User {
    const newUser = new User(name, email, password, id);
    newUser.events.push(new UserCreatedEvent(newUser.id));
    return newUser;
  }

}