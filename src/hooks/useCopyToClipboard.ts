import { useState, useEffect } from "react";

/**
 * Хук useCopyToClipboard
 *
 * @param timeoutDuration - время активности флага copied (по умолчанию 2000 мс)
 *
 * @returns Объект с двумя свойствами:
 *   - copied: boolean — флаг, указывающий, что копирование прошло успешно, и который автоматически сбрасывается через timeoutDuration
 *   - copyToClipboard: (text: string) => void — функция, принимающая текст для копирования в буфер обмена
 */
export const useCopyToClipboard = (timeoutDuration: number = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => setCopied(true))
        .catch((error) => {
          console.error("Ошибка копирования:", error);
          setCopied(false);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
      } catch (error) {
        console.error("Ошибка при копировании:", error);
        setCopied(false);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  useEffect(() => {
    let timeout: number;
    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), timeoutDuration);
    }
    return () => clearTimeout(timeout);
  }, [copied, timeoutDuration]);

  return { copied, copyToClipboard };
};
