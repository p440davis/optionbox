import { setup } from "./setup"

test("Setup function exists", () => {
    expect(typeof setup === "function").toBeTruthy();
});
