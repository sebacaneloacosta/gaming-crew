interface CreatorLayoutProps {
    params: { username: string };
    children: React.ReactNode;
}




const CreatorLayout = ({
    params,
    children,
}: CreatorLayoutProps) => {
    return (
        <div>
            {children}
        </div>
    )
}


export default CreatorLayout;