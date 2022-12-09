import Role from '../database/models/Role';
import User from '../database/models/User';

class RoleService {
  private _repository = Role;

  async getUserRole(email: string): Promise<string> {
    const role = (await this._repository.findOne({
      include: [{ model: User, as: 'users', where: { email } }],
    })) as Role;

    return role.name;
  }
}

export default RoleService;
