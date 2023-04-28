import { Controller, HttpResponse, serverError, ok } from '@/presentation/contracts'
import { badRequest } from '@/presentation/help'
import { MissingParamError } from '@/presentation/errors'
import { CreateUserRepository} from '@/infra/repositories/user'
import {UserCreateRepository} from '@/infra/usecases'

export class UserCreateController implements Controller {
  constructor (
    private readonly createUserRepository: UserCreateRepository
    ) {}

    async handle (request: UserCreateController.Request): Promise<HttpResponse> {
    try {
      for (const field in request){
        if (request[field] === '') {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, nick_name } = request
      const resp = await this.createUserRepository.create({name, email, nick_name})

      return ok(resp)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UserCreateController {
  export type Request = {
    name: string
    nick_name: string
    email: string
  }
}

// const validate = (request: UserCreateController.Request): boolean => {


//   for 


//   return true

// }