import { ToDoPriority } from "../bim-components/TodoCreator";

export default function todoPriorityColor(priority: ToDoPriority) {
  let priorityColor: string;
  priority === "Low"
    ? (priorityColor = "59bc59")
    : priority === "High"
    ? (priorityColor = "ff7676")
    : (priorityColor = "597cff");
  return priorityColor;
}
