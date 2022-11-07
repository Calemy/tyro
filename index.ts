import Logger from "cutesy.js"
import { fastify as f } from "fastify"
import v1 from "./v1"

const logger: Logger = new Logger().addTimestamp("hh:mm:ss").purpleBlue()
const fastify = f({ trustProxy: true })

fastify.addHook('onResponse', async (req, reply) => {
    logger.send(`${req.ips[req.ips.length - 1]} -> ${req.url} (${reply.statusCode}) - ${reply.getResponseTime().toFixed(2)}ms`)
})

fastify.register(v1, { prefix: "/v1"})

fastify.listen({ port: 3000 })

logger.send("Starting Tyro - a osu!api emulator for bancho.py")