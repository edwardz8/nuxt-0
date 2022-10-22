import { getLikesByUser } from '~/server/database/repositories/likeRepository';

export default defineEventHandler(async (event) => {
    const query = await useQuery(event)
    const itemId = query.itemId

    const likes = await getLikesByUser(itemId)

    const likesGroupedByItem = likes.reduce(function (r, a) {
        r[a.itemId] = r[a.itemId] || []
        r[a.itemId].push(a)
        return r
    }, Object.create(null))

    return likesGroupedByItem

})