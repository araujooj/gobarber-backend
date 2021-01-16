import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using an email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendEmail')

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'teste@email.com',
      password: '123456',
    })

    const recoverPassword = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

    await recoverPassword.execute({
      email: 'teste@email.com',
    })

    expect(sendMail).toHaveBeenCalled();
  })
})
