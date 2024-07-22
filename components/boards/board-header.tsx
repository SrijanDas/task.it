import React from "react";

type Props = {
    boardTitle: string;
};

function BoardHeader({ boardTitle }: Props) {
    return (
        <nav className="isolate h-16 bg-blend-saturation px-8 py-3 bg-white/20 shadow-sm flex items-center">
            <h4 className="font-semibold text-xl text-white">{boardTitle}</h4>
        </nav>
    );
}

export default BoardHeader;
