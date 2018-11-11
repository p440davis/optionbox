import { load } from "../../src/core/load";

test("load object exists", () => {
    expect(typeof load === "object").toBeTruthy();
});