import { err, ok, Result } from "neverthrow";

const jsonParse = (input: string): Result<any, SyntaxError> => {
  try {
    return ok(JSON.parse(input));
  } catch (error) {
    // Expected error
    if (error instanceof SyntaxError) {
      return err(error);
    }
    // Unexpected error
    throw error;
  }
};
