import { persist } from "../../src/core/persist";

test("Key is prefixed with optionbox-", () => {
    expect(persist.key("test")).toBe("optionbox-test");
});