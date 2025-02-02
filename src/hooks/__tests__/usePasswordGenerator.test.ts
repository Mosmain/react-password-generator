import { renderHook } from "@testing-library/react";
import { usePasswordGenerator } from "../usePasswordGenerator";

describe("usePasswordGenerator", () => {
  it("генерирует пароль с минимальной длиной", () => {
    const { result } = renderHook(() => usePasswordGenerator(6));
    expect(result.current.password.length).toBe(6);
  });
});
