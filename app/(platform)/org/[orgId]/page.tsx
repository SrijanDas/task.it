import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type Props = {};

function OrganizationPage({}: Props) {
    const { orgId } = auth();
    return <div>{orgId}</div>;
}

export default OrganizationPage;
