import { err, ok, Result } from "neverthrow";
import { expect, it, vitest } from "vitest";

const jsonParse = (input: string): Result<any, SyntaxError> => {
  try {
    return ok(JSON.parse(input));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return err(error);
    }
    throw error;
  }
};

const handleRequest = (
  req: {
    body: string;
  },
  res: (status: number, message: string) => void,
) => {
  const result = jsonParse(req.body);

  if (result.isOk()) {
    res(200, result.value.id);
  } else {
    res(400, result.error.message);
  }
};

it("Should return the id if the JSON is valid", () => {
  const resSpy = vitest.fn();

  handleRequest({ body: '{"id": "123"}' }, resSpy);

  expect(resSpy).toHaveBeenCalledWith(200, "123");
});

it("Should return the error message if the JSON is invalid", () => {
  const resSpy = vitest.fn();

  handleRequest({ body: "invalid json" }, resSpy);

  expect(resSpy).toHaveBeenCalledWith(
    400,
    "Unexpected token 'i', \"invalid json\" is not valid JSON",
  );
});
