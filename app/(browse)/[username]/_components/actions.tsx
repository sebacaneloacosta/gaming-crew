"use client";

import { toast } from "sonner";
import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

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

    return (
        <Button 
            disabled={isPending} 
            onClick={onClick} 
            variant="primary"
        >
            {isFollowing ? "Dejar de seguir" : "Seguir"}
        </Button>
    )
}