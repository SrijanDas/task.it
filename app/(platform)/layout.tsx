import React from "react";
import PlatformNavbar from "./_components/platform-navbar";

function PlatformLayout({ children }: React.PropsWithChildren) {
    return (
        <div>
            <PlatformNavbar />
            {children}
        </div>
    );
}

export default PlatformLayout;
