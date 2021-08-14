import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const isUserAdmin = this.usersRepository.findById(user_id).admin === true;
    if (!isUserAdmin) {
      throw new Error("You need to be admin to list all users!");
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
