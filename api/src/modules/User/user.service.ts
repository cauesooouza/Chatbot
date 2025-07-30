import { Repository } from "typeorm";
import { User } from "./user.entity.js";
import { CreateUserInput } from "./user.schema.js";
import { GenericError, HttpStatus } from "../../errors/GenericError.js";
import { Password } from "../../utils/Password.js";

export class UserService {
    constructor(private userRepository: Repository<User>) { }

    async create(userInput: CreateUserInput): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findOneBy({ email: userInput.email })

        if (existingUser) throw new GenericError(`User already exist`, HttpStatus.CONFLICT);

        userInput.password = await Password.hashPassword(userInput.password);

        const newUser = this.userRepository.create(userInput);
        const savedUser = await this.userRepository.save(newUser);

        const { password, ...userWithoutPwd } = savedUser;
        return userWithoutPwd;
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });

        if (!user) throw new GenericError(`User email ${email} not found`, HttpStatus.NOT_FOUND);

        return user;

    }
}