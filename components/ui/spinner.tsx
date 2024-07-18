import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

function Spinner({}: Props) {
    return <Loader2 className="h-4 w-4 animate-spin" />;
}

export default Spinner;
