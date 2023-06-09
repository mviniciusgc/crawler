import { Controller } from '@/presentation/contracts'

export const adaptResolver = async (controller: Controller): Promise<any> => {
  const httpResponse = await controller.handle(null)
  return httpResponse.body
}