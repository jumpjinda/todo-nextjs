import { FaListUl } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaBullseye } from "react-icons/fa6";

export const pageRoute = [
  {
    label: "All Tasks",
    route: "all-tasks",
    icon: <FaListUl />,
  },
  {
    label: "Important!",
    route: "important",
    icon: <FaExclamation />,
  },
  {
    label: "Completed!",
    route: "completed",
    icon: <FaCheck />,
  },
  {
    label: "Do It Now",
    route: "do-it-now",
    icon: <FaBullseye />,
  },
];
