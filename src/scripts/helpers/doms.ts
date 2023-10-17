/**
 * @description query html element
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */
export const querySelector = <T extends HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T => {
  return parent.querySelector(selector) as T;
};

/**
 * @description query all html elements
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns list html elements
 */
export const querySelectorAll = (
  selector: string,
  parent: HTMLElement | Document = document
) => {
  return parent.querySelectorAll(selector) as NodeListOf<HTMLElement>;
};

/**
 * @description query html element by id
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns html element
 */

export const getElementById = <T extends HTMLElement>(selector: string): T => {
  return document.getElementById(selector) as T;
};
