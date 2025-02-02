import { act, renderHook, waitFor } from "@testing-library/react";
import { usePasswordGenerator } from "../usePasswordGenerator";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../../constants";

describe("Генерация пароля", () => {
  it("генерирует пароль с минимальной длиной", () => {
    const { result } = renderHook(() =>
      usePasswordGenerator(MIN_PASSWORD_LENGTH)
    );
    expect(result.current.password.length).toBe(MIN_PASSWORD_LENGTH);
  });

  it("генерирует пароль с максимальной длиной", () => {
    const { result } = renderHook(() =>
      usePasswordGenerator(MAX_PASSWORD_LENGTH)
    );
    expect(result.current.password.length).toBe(MAX_PASSWORD_LENGTH);
  });

  it("генерирует пароль с кастомными настройками", () => {
    const { result } = renderHook(() =>
      usePasswordGenerator(undefined, {
        upper: true,
        lower: true,
        numbers: true,
        spaces: true,
        separators: true,
        symbols: true,
      })
    );

    const password = result.current.password;
    expect(password).toMatch(/[A-Z]/); // upper
    expect(password).toMatch(/[a-z]/); // lower
    expect(password).toMatch(/[0-9]/); // numbers
    expect(password).toMatch(/\s/); // spaces
    expect(password).toMatch(/[-_]/); // separators
    expect(password).toMatch(/[!#$%&()*+./:;=>?@[\\\]^`{|}~']/); // symbols
  });
});

describe("Регенирация пароля", () => {
  it("регенирирует пароль через функцию regenerate", async () => {
    const { result } = renderHook(() => usePasswordGenerator());
    const initialPassword = result.current.password;

    await act(async () => {
      result.current.regenerate();
    });

    await waitFor(() => {
      expect(result.current.password).not.toBe(initialPassword);
    });
  });

  it("генерирует новый пароль через функцию generatePassword", async () => {
    const { result } = renderHook(() => usePasswordGenerator());
    const initialPassword = result.current.password;

    await act(async () => {
      result.current.generatePassword();
    });

    await waitFor(() => {
      expect(result.current.password).not.toBe(initialPassword);
    });
  });

  it("генерирует новый пароль при изменении длины", async () => {
    const { result } = renderHook(() => usePasswordGenerator());
    const initialPassword = result.current.password;

    await act(async () => {
      result.current.setPasswordLength(10);
    });
    await waitFor(() => {
      expect(result.current.password).not.toBe(initialPassword);
    });
  });

  it("генерирует новый пароль при изменении настроек", async () => {
    const { result } = renderHook(() => usePasswordGenerator());
    const initialPassword = result.current.password;

    await act(async () => {
      result.current.toggleSetting("lower");
    });

    await waitFor(() => {
      expect(result.current.password).not.toBe(initialPassword);
    });
  });
});

describe("Валидация пароля", () => {
  const testCases = [
    {
      description: "ни один параметр не выбран",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: false,
        separators: false,
        symbols: false,
      },
      expectedMessage: "Выберите хотя бы один параметр!",
    },
    {
      description: "выбраны только пробелы",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: true,
        separators: false,
        symbols: false,
      },
      expectedMessage: "Нельзя выбрать только пробелы и/или разделители!",
    },
    {
      description: "выбраны только разделители",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: false,
        separators: true,
        symbols: false,
      },
      expectedMessage: "Нельзя выбрать только пробелы и/или разделители!",
    },
    {
      description: "выбраны пробелы и разделители",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: true,
        separators: true,
        symbols: false,
      },
      expectedMessage: "Нельзя выбрать только пробелы и/или разделители!",
    },
  ];

  testCases.forEach(({ description, settings, expectedMessage }) => {
    it(`возвращает ошибку, если ${description}`, () => {
      const { result } = renderHook(() =>
        usePasswordGenerator(undefined, settings)
      );
      expect(result.current.password).toBe(expectedMessage);
    });
  });
});

describe("Состояние кнопок", () => {
  const testLengthCases = [
    {
      description: "длине пароля меньше MIN_PASSWORD_LENGTH",
      length: MIN_PASSWORD_LENGTH - 1,
    },
    {
      description: "длине пароля больше MAX_PASSWORD_LENGTH",
      length: MAX_PASSWORD_LENGTH + 1,
    },
  ];

  const testSettingsCases = [
    {
      description: "настройках все выключено",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: false,
        separators: false,
        symbols: false,
      },
    },
    {
      description: "настройке только пробелы",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: true,
        separators: false,
        symbols: false,
      },
    },
    {
      description: "настройке только разделители",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: false,
        separators: true,
        symbols: false,
      },
    },
    {
      description: "настройках пробелы и разделители",
      settings: {
        upper: false,
        lower: false,
        numbers: false,
        spaces: true,
        separators: true,
        symbols: false,
      },
    },
  ];

  testLengthCases.forEach(({ description, length }) => {
    it(`блокирует кнопку при ${description}`, async () => {
      const { result } = renderHook(() => usePasswordGenerator());

      await act(async () => {
        result.current.setPasswordLength(length);
      });

      await waitFor(() => {
        expect(result.current.isButtonsDisabled).toBe(true);
      });
    });
  });

  testSettingsCases.forEach(({ description, settings }) => {
    it(`блокирует кнопку при ${description}`, async () => {
      const { result } = renderHook(() =>
        usePasswordGenerator(undefined, settings)
      );

      await waitFor(() => {
        expect(result.current.isButtonsDisabled).toBe(true);
      });
    });
  });
});
