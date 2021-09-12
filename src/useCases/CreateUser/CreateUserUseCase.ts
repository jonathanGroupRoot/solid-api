import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private userRepositories: IUsersRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const alreadyExists = await this.userRepositories.findByEmail(data.email);

        if (alreadyExists) {
            throw new Error('User already exists');
        }

        const user = new User(data);

        this.userRepositories.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "Equipe do meu App",
                email: "jonathangrouproot@gmail.com"
            },
            subject: "Seja bem vindo a plataforma",
            body: "<p>Você já pode fazer login em nossa plataforma  </p>"
        })
    }
}