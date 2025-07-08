import showdown from "showdown";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const converter = new showdown.Converter();

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const htmlToMarkdown = (htmlString: string) => {
  const md = converter.makeMarkdown(htmlString);
  return md;
};

export const markdownToHTML = (md: string) => {
  const html = converter.makeHtml(md);
  return html;
};
