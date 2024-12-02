import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: { id },
        });

        if (!otherUser) {
            throw new Error("Usuario no encontrado");
        }

        if (otherUser.id === self.id) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id,
            }
        })

        return !!existingFollow;

    } catch {
        return false;
    }
}


export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("Usuario no encontrado");
    }

    if (otherUser.id === self.id) {
        throw new Error("No puedes seguirte a ti mismo");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        }
    })

    if (existingFollow) {
        throw new Error("Ya sigues a este usuario");
    }

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id,
        },
        include: {
            following: true,
            follower: true,
        }
    })

    return follow;

}

export const unfollowUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {
            id,
        }
    })

    if (!otherUser) {
        throw new Error("Usuario no encontrado");
    }

    if (otherUser.id === self.id) {
        throw new Error("Algo ha ido mal :(")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        }
    })

    if (!existingFollow) {
        throw new Error("No sigues a este usuario");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        }
    })

    return follow;

}