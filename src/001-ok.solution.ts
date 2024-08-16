import { ok } from "neverthrow";
import { expect, it } from "vitest";
import { Expect, Equal } from "@total-typescript/helpers";

const myFunc = () => {
  return ok("Hello World");
};

it("Should return an ok type", () => {
  const result = myFunc();
  expect(result.isOk()).toBe(true);
  expect(result.value).toBe("Hello World");

  type Test = Expect<Equal<typeof result.value, string>>;
});
