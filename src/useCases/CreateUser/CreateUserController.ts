import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) { }

    async handler(request: Request, response: Response) {

        try {
            const { name, email, password } = request.body;

            this.createUserUseCase.execute({
                name, email, password
            });

            return response.status(201).send();

        } catch (error) {
            return response.status(400).json({
                message: "Error"
            })
        }
    }
}