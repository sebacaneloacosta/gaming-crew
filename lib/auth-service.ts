import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("No autorizado");
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id},
    })

    if (!user) {
        throw new Error("Not found");
    }

    return user;
}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Ha ocurrido un error");
    };

    const user = await db.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new Error("Usuario no encontrado");
    };

    if (self.username !== user.username) {
        throw new Error("No autorizado")
    };

    return user;

}