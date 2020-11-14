import { routes, getRoute } from "core/router";
import { expect, test } from "@jest/globals";

test("check getRoute method", () => {
    Object.entries(routes).map(([ key, value ]) => {
        expect(getRoute(key)).toBe(value);
    });
});

