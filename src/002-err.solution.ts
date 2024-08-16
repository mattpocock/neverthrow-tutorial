import { err, ok } from "neverthrow";
import { expect, it } from "vitest";
import { Expect, Equal } from "@total-typescript/helpers";

const divide = (a: number, b: number) => {
  if (a === 0 || b === 0) {
    return err(new Error("Cannot divide by zero"));
  }

  return ok(a / b);
};

it("Should return the result if a or b are not zero", () => {
  const result = divide(10, 2);
  expect(result.isOk()).toBe(true);

  if (!result.isOk()) return;

  expect(result.value).toBe(5);

  type Test = Expect<Equal<typeof result.value, number>>;
});

it("Should return an error if b is zero", () => {
  const result = divide(10, 0);
  expect(result.isErr()).toBe(true);

  if (!result.isErr()) return;

  expect(result.error.message).toBe("Cannot divide by zero");

  type Test = Expect<Equal<typeof result.error, Error>>;
});

it("Should return an error if a is zero", () => {
  const result = divide(0, 10);

  expect(result.isErr()).toBe(true);

  if (!result.isErr()) return;

  expect(result.error.message).toBe("Cannot divide by zero");

  type Test = Expect<Equal<typeof result.error, Error>>;
});
