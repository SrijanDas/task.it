import { Database as DB } from "./database.types";


declare global {
    type Database = DB;
    type ListItem = Database["public"]["Tables"]["list"]["Row"] & {
    cards?: CardItem[]};
    type CardItem = Database["public"]["Tables"]["cards"]["Row"];
}