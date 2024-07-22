import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type Props = {};

function OrganizationPage({}: Props) {
    const { orgId } = auth();
    return <main className="p-12 py-8">{orgId}</main>;
}

export default OrganizationPage;
