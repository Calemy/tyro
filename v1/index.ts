import { FastifyInstance } from "fastify"
import user from "./user"

export default async function(fastify: FastifyInstance){
    fastify.get('/get_user', user)
}