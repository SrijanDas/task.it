import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

type Props = {};

function MoveCard({}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="w-full">
                    <ArrowRight size={16} /> Move
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Card className="border-none">
                    <CardHeader>
                        <CardTitle>Move Card</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                    <CardFooter className="flex justify-between">
                        <Button>Move</Button>
                    </CardFooter>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default MoveCard;
