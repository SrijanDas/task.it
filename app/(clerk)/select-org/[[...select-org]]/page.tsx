import { OrganizationList } from "@clerk/nextjs";
import React from "react";

type Props = {};

const redirectUrl = "/org/:id";

function SelectOrgPage({}: Props) {
    return (
        <OrganizationList
            afterCreateOrganizationUrl={redirectUrl}
            afterSelectOrganizationUrl={redirectUrl}
            afterSelectPersonalUrl={redirectUrl}
        />
    );
}

export default SelectOrgPage;
