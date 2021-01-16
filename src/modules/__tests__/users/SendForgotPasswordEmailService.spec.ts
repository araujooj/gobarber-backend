import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  })

  it('should be able to recover the password using an email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@email.com',
      password: '123456',
    })

    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail')

    await sendForgotPasswordEmail.execute({
      email: 'teste@email.com',
    })

    expect(sendMail).toHaveBeenCalled();
  })

  it('should not be able to recover the password using an non-existing email', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'teste@email.com',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to generate a recover password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@email.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({ email: user.email })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
