export async function getUserLikes(itemId: string) {
    const like = await $fetch('/api/like/getLikes?itemId=' + itemId, { method: 'GET' })
    return like
}

export async function addUserLike({ itemId, userId }) {
    const like = await $fetch('/api/like/addLike', { method: 'POST', body: { userId: userId, itemId: itemId } })
    return like
}

export async function removeUserLike(likeId) {
    const res = await $fetch('/api/like/deleteLike?likeId=' + likeId, { method: 'GET' })
    return res
}