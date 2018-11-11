import { update } from "../../src/core/update";

test("update object exists", () => {
    expect(typeof update === "object").toBeTruthy();
});