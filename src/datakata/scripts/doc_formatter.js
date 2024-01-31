import { update_classes } from "./formatter_utils";

const classes_h1 = ["container", "text-center", "py-5", "font-bold"];
const classes_h2 = ["container", "text-center", "py-4", "font-semibold"];
const classes_h3 = ["container", "text-left", "py-3", "font-semibold"];
const classes_p = ["container", "pb-3"];
const classes_a = ["text-orange", "underline", "decoration-2"];
const classes_ul = ["list-disc", "pl-5", "pb-3"];

update_classes("h1", classes_h1, "doc-body");
update_classes("h2", classes_h2, "doc-body");
update_classes("h3", classes_h3, "doc-body");
update_classes("p", classes_p, "doc-body");
update_classes("a", classes_a, "doc-body");
update_classes("ul", classes_ul, "doc-body");
