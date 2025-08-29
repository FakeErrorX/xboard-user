import { lazy } from "react";
import Loadable from "@/components/Loadable";

// Lazy load the DataGrid component to reduce initial bundle size
const DataGrid = Loadable(lazy(() => import("./DataGrid")));

export default DataGrid;
