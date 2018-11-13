import { get } from "../../src/core/get"

const defaults = {
    persist: true,
    select: "select"
}

const userSet = {
    persist: false,
    select: ".class, #id"
}

test("get.config function exists", () => {
    expect(typeof get.config === "function").toBeTruthy();
});

test("No user settings, return defaults", () => {
    expect(get.config()).toEqual(defaults);
})

test("Nonsense user settings do not affect defaults, return defaults", () => {
    expect(get.config({ nonsense: 1 })).toEqual({ ...defaults, nonsense: 1 });
})

test("User sets defaults, return defaults", () => {
    expect(get.config(defaults)).toEqual(defaults);
})

test("User sets select, return user setting and defaults", () => {
    expect(get.config({ select: userSet.select })).toEqual({ select: userSet.select, persist: true });
})

test("User sets persist, return user setting and defaults", () => {
    expect(get.config({ persist: userSet.persist })).toEqual({ select: "select", persist: userSet.persist });
})

test("User settings in any order, return user settings", () => {
    expect(get.config(userSet)).toEqual(userSet);
})