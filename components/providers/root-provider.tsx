"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function RootProvider({ children }: React.PropsWithChildren) {
    return (
        <>
            {children}
            <ProgressBar
                height="4px"
                color="#0284c7"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
}

export default RootProvider;
