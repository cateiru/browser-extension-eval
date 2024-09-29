export async function parse(code: string): Promise<unknown | undefined>;
export async function parse<T>(
  code: string,
  args: T,
): Promise<unknown | undefined>;

/**
 * `(args: T) => unknown` という文字列関数を受け取り、実行する
 *
 * @param code - 実行する関数の文字列
 * @param args - 関数に渡す引数
 * @returns - 関数の戻り値
 */
export async function parse<T>(
  code: string,
  args?: T,
): Promise<unknown | undefined> {
  let fn: unknown;
  try {
    fn = Function(`"use strict";return (${code})`)();
  } catch (e) {
    console.error(e);
    return;
  }

  if (typeof fn !== "function") {
    return;
  }

  let result: unknown;
  try {
    result = await Promise.resolve(fn.call(undefined, args));
  } catch (e) {
    console.error(e);
    return;
  }

  return result;
}
