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

const checkForId = (data: any): Result<{ id: string }, Error> => {
  if (!data.id) {
    return err(new Error("No id found"));
  }

  return ok(data);
};

const handleRequest = (
  req: {
    body: string;
  },
  res: (status: number, message: string) => void,
) => {
  jsonParse(req.body)
    .andThen(checkForId)
    .map((data) => {
      res(200, data.id);
    })
    .mapErr((err) => {
      res(400, err.message);
    });
};

it("Should return the id if the JSON is valid", () => {
  const resSpy = vitest.fn();

  handleRequest({ body: '{"id": "123"}' }, resSpy);

  expect(resSpy).toHaveBeenCalledWith(200, "123");
});

it("Should error if you do not pass an id", () => {
  const resSpy = vitest.fn();

  handleRequest({ body: "{}" }, resSpy);

  expect(resSpy).toHaveBeenCalledWith(400, "No id found");
});

it("Should return the error message if the JSON is invalid", () => {
  const resSpy = vitest.fn();

  handleRequest({ body: "invalid json" }, resSpy);

  expect(resSpy).toHaveBeenCalledWith(
    400,
    "Unexpected token 'i', \"invalid json\" is not valid JSON",
  );
});
