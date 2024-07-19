import { Database as DB } from "./database.types";


declare global {
    type Database = DB;
    type ListItem = Database["public"]["Tables"]["list"]["Row"] & {
    cards?: CardItem[]};
    type CardItem = Database["public"]["Tables"]["cards"]["Row"];
    type CheckListItem = Database["public"]["Tables"]["checklist_items"]["Row"];
    type CheckList = Database["public"]["Tables"]["checklist"]["Row"] & {checklist_items?: CheckListItem[]};
}