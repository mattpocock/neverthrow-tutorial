import { err, ok } from "neverthrow";
import { expect, it } from "vitest";
import { Expect, Equal } from "@total-typescript/helpers";

const jsonParse = (input: string) => {
  try {
    return ok(JSON.parse(input));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err(error);
    }
    throw error;
  }
};

it("Should parse JSON", () => {
  const result = jsonParse('{"key": "value"}');
  expect(result.isOk()).toBe(true);

  if (!result.isOk()) return;

  expect(result.value).toEqual({ key: "value" });

  type Test = Expect<Equal<typeof result.value, any>>;
});

it("Should return an error if the JSON is invalid", () => {
  const result = jsonParse("invalid json");
  expect(result.isErr()).toBe(true);

  if (!result.isErr()) return;

  expect(result.error).toBeInstanceOf(SyntaxError);

  type Test = Expect<Equal<typeof result.error, SyntaxError>>;
});
