const Heading = ({ children, title = true }: { children: string; title?: boolean }) => {
    return (
        <>
            {title ? (
                <h1 className="font-bold text-2xl">{children}</h1>
            ) : (
                <h2 className="font-bold text-2xl">{children}</h2>
            )}
        </>
    );
};

export default Heading;
