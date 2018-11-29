import test from "ava";
import * as express from "../lib";

test("Exist resources Fn", (t) => {
    const app = express();
    t.is(typeof app.resources, "function");
});
