import { FaHome } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaBullseye } from "react-icons/fa6";

export const pageRoute = [
  {
    label: "Home",
    route: "/",
    value: "",
    icon: <FaHome />,
  },
  {
    label: "All Tasks",
    route: "/all-tasks",
    value: "all-tasks",
    icon: <FaListUl />,
  },
  {
    label: "Important!",
    route: "/important",
    value: "important",
    icon: <FaExclamation />,
  },
  {
    label: "Completed!",
    route: "/completed",
    value: "completed",
    icon: <FaCheck />,
  },
  {
    label: "Do It Now",
    route: "/do-it-now",
    value: "do-it-now",
    icon: <FaBullseye />,
  },
];
