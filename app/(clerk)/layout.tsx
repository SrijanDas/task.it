import React from "react";

function ClerkLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {children}
        </div>
    );
}

export default ClerkLayout;
