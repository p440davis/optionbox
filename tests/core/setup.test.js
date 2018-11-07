import { setup } from "../../src/core/setup"

const defaults = {
    select: "select",
    persist: true
}

const userSet = {
    persist: false,
    select: ".class, #id"
}

test("Setup function exists", () => {
    expect(typeof setup === "function").toBeTruthy();
});

test("No user settings, return defaults", () => {
    expect(setup()).toEqual(defaults);
})

test("Nonsense user settings, return defaults", () => {
    expect(setup({ nonsense: 1 })).toEqual(defaults);
})

test("User sets defaults, return defaults", () => {
    expect(setup(defaults)).toEqual(defaults);
})

test("User sets select, return user setting and defaults", () => {
    expect(setup({ select: userSet.select })).toEqual({ select: userSet.select, persist: true });
})

test("User sets persist, return user setting and defaults", () => {
    expect(setup({ persist: userSet.persist })).toEqual({ select: "select", persist: userSet.persist });
})

test("User settings in any order, return user settings", () => {
    expect(setup(userSet)).toEqual(userSet);
})