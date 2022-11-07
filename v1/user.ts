import database from "../helper/database"
import errors from "../helper/errors"
import moment from "moment"
import { FastifyRequest, FastifyReply } from "fastify"
import { DatabaseUser, DatabaseStats } from "../interface/user";

export default async function(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>{

    /**
         * Query parameters:
         * 'k' -> API Key (Required)
         * 'u' -> User ID or username (Required)
         * 'm' -> Gamemode integer. 0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania. (Optional, default value is 0)
         * 'type' -> Specify if the query parameter 'u' is a User ID or a username. Use 'string' for usernames
         *           or 'id' for user IDs. (Optional, default behaviour is automatic recognition)
         * 'event_days' -> Max number of days between now and last event date. Range of 1-31. (Optional, default value is 1)
         *
         * More info: https://github.com/ppy/osu-api/wiki#apiget_user
	 */

    const username = req.query.u as string;
    let mode = req.query.m as number;

    if(!username) return reply.send({ error: errors.INVALID_ARGUMENTS })

    if(mode < 0 || mode > 3 || isNaN(mode)) mode = 0

    const user = database.selectOne("users", {
        condition: `username_safe = ${username.toLowerCase().replaceAll(" ", "_")}`
    }) as unknown as DatabaseUser //? Why the fuck typescript, might need to change the return value as unknown on mysql-commands

    if(!user) return reply.send({ error: errors.USER_NOT_FOUND })

    const stats = database.selectOne("stats", {
        condition: `id = ${user.id} AND mode = ${mode}`
    }) as unknown as DatabaseStats
    
    return reply.send({
        user_id: `${user.id}`,
        username: `${user.name}`,
        join_date: `${moment.unix(user.creation_time).utc().format("YYYY-MM-DD HH:MM:SS")}`,
        count300: `0`, //Not supported by bancho.py
        count100: `0`, //Not supported by bancho.py
        count50: `0`, //Not supported by bancho.py
        playcount: `${stats.plays}`,
        ranked_score: `${stats.rscore}`,
        total_score: `${stats.tscore}`,
        pp_rank: `1`, //TODO: Connect Redis LOL
        level: `1`, //? Not supported by bancho.py
        pp_raw: `${stats.pp}`,
        accuracy: `${stats.accuracy}`,
        count_rank_ss: `${stats.x_count}`,
        count_rank_ssh: `${stats.xh_count}`,
        count_rank_s: `${stats.s_count}`,
        count_rank_sh: `${stats.sh_count}`,
        count_rank_a: `${stats.a_count}`,
        country: user.country.toUpperCase(),
        total_seconds_played: `${stats.playtime}`,
        pp_country_rank: `1` //TODO: Connect Redis LOL
    })
}
