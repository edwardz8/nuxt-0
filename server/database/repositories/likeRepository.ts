import prisma from '../client'
import { ILike } from '~~/types/ILike'

export async function getLikesByUser(playerId) {
    const idArray = playerId.split(',').map(Number)
    return await prisma.like.findMany({
        where: {
            itemId: { in: idArray }
        },
        select: {
            id: true,
            itemId: true,
            userId: true
        }
    })
}

export async function addLike(data: ILike) {
    const like = await prisma.like.create({
        data: {
            userId: data.userId,
            itemId: data.itemId
        }
    })

    return like
}

export async function deleteLike(data) {
    await prisma.like.delete({
        where: {
            id: +data.id,
        },
    })
    return 'Unliked successfully!'
}