import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository
implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User)
  }

  findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findUser || undefined;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create({
      name,
      email,
      password,
    })

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default UsersRepository;
