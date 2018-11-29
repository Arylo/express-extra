import test from "ava";
import * as express from "../lib";

test("Exist Controller", (t) => {
    t.true(!!express.Controller);
});
