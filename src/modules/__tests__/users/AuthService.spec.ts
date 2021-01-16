import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import AuthService from '@modules/users/services/AuthService';
import CreateUserService from '@modules/users/services/CreateUserService'

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthService;
let createUser: CreateUserService;

describe('AuthUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthService(fakeUserRepository, fakeHashProvider);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    const auth = await authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(auth).toHaveProperty('token')
    expect(auth.user).toEqual(user)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
    })

    expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'john@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })
})
