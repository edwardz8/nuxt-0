import { CompatibilityEvent } from 'h3'
import { addLike } from '~/server/database/repositories/likeRepository';

export default async (event: CompatibilityEvent) => {
    const body = await useBody(event)

    const likeData = {
        userId: body.userId,
        itemId: +body.itemId,
    }

    const like = await addLike(likeData)

    return like
}