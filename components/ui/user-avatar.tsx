'use client';

import * as React from 'react';
import { User } from '@/src/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
    user: Pick<User, 'email'>;
    showStatus?: boolean;
    className?: string;
    fallbackClassName?: string;
}

export function UserAvatar({
    user,
    showStatus = false,
    className,
    fallbackClassName,
    ...props
}: UserAvatarProps) {
    const getInitials = React.useCallback((email: string) => {
        return email
            .split('@')[0]
            .split('.')
            .map(part => part[0]?.toUpperCase())
            .join('');
    }, []);

    return (
        <div className="relative inline-block">
            <Avatar className={cn("border-2 border-primary", className)} {...props}>
                <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                    alt={user.email}
                    className="object-cover"
                />
                <AvatarFallback className={cn("bg-primary/10 text-primary", fallbackClassName)}>
                    {getInitials(user.email)}
                </AvatarFallback>
            </Avatar>
            {showStatus && (
                <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
