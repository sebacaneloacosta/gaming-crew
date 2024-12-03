"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
}: StreamPlayerProps) => {

    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        return (
            <div>
                No puedes ver el stream
            </div>
        )
    }

    return (
        <div>
            Puedes ver el stream!
        </div>
    )
}