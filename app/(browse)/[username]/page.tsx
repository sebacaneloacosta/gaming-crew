import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params
}: UserPageProps) => {

    const user = await getUserByUsername(params.username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    //if (isBlocked) {
    //    notFound();
    //}

    return (
        <div className="flex flex-col gap-y-4">
            <p>Usuario: {user.username}</p>
            <p>ID de Usuario: {user.id}</p>
            <p>Siguiendo: {`${isFollowing}`}</p>
            <p>Bloqueado por este usuario: {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing}/>
        </div>
    )
}

export default UserPage;