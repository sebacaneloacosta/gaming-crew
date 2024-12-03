"use client";

import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`Ahora sigues a ${data.following.username}`))
                .catch(() => toast.error("Algo ha ido mal :("))
        })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`Dejaste de seguir a ${data.following.username}`))
                .catch(() => toast.error("Algo ha ido mal :("))
        })
    }

    const onClick = () => {
        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`Has bloqueado a ${data.blocked.username}`))
            .catch(() => toast.error("Algo ha ido mal :("))
        })
    };

    return (
        <>
        <Button 
            disabled={isPending} 
            onClick={onClick} 
            variant="primary"
        >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
        </Button>
        <Button
            onClick={handleBlock}
            disabled={isPending}
        >
            Bloquear
        </Button>
        </>
    )
}