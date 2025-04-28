export interface AnyObject {
  [key: string]: unknown;
}

/**
 * Allow a Record/Object type to have unknown properties.
 *
 * @example
 *   type Foo = WithUnknown<{ foo: string }>
 *   // the type for `foo` will resolve to be
 *   type Foo = {
 *     foo: string;
 *     [key: string]: unknown;
 *   }
 *   // which can then be used as:
 *   const thing: Foo = { foo: "bar", baz: 123 };
 */
export type WithUnknown<T> = T & AnyObject;

/**
 * Allow a type's properties to be optional _except_ for those specified
 * and allows you to ensure that only some properties will be required so
 * they can be relied on being present, but will make everything else optional
 *
 * @example
 *     type Test = {
 *       foo: string;
 *       bar: string;
 *       baz: string;
 *     };
 *     type Test1 = SomeRequired<Test, "foo">;
 *     const test1: Test1 = {
 *       foo: '123'
 *     }
 *
 *     // In the above example, `Test1` is equivalent to:
 *     type Test2 = {
 *      foo: string;
 *      bar?: string;
 *      baz?: string;
 *     }
 * @see https://tsplay.dev/NnoEdm
 */
export type SomeRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;

/**
 * Make a subset of properties in a type optional.
 * see e.g. https://stackoverflow.com/a/61108377.
 *
 * @example
 *    type Test = {
 *      foo: string;
 *      bar: string;
 *      baz: string;
 *    };
 *
 *    type MaybeFoo = WithOptional<Test, "foo">;
 *    const maybeFoo: MaybeFoo = { bar: '123', baz: '456' };
 */
export type WithOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

/**
 * Extract the values from an object type
 *
 * @example
 *   const LogLevel = {
 *    INFO: "info",
 *    WARN: "warn",
 *    ERROR: "error",
 *  } as const;
 *
 *  type LogLevel = ObjectValues<typeof LogLevels>;
 *  // LogLevel is "info" | "warn" | "error"
 */
export type ObjectValues<T> = T[keyof T];

/**
 * Extract the keys from an object type
 *
 * @example
 *   const LogLevel = {
 *    info: "Information",
 *    warn: "Warning",
 *    error: "Error",
 *  } as const;
 *
 *  type LogLevel = ObjectKeys<typeof LogLevels>;
 *  // LogLevel is "info" | "warn" | "error"
 */
export type ObjectKeys<T> = keyof T;

// Used for branded types. This allows the type hinting but without intellisense pollution.
declare const __brand: unique symbol; // eslint-disable-line no-underscore-dangle
export type Brand<B> = { [__brand]: B };

/**
 * Allows type hinting for a serialized value by passing
 * it along as a generic but always returning a string
 *
 * @example
 *  type SerializedFoo = Serialized<Foo>;
 */
export type Serialized<T> = string & Brand<T>;

/**
 * Turn an array of values into a union type.
 *
 * If something is passed that is not an array, it will return `never`.
 *
 * @example
 *   // Note the necessity of `as const` if you want a union
 *   // of values rather than a union of types.
 *   const things = ["foo", "bar", "baz"] as const;
 *   type ThingKeys = Unionize<typeof things>;
 *   // ThingKeys is "foo" | "bar" | "baz"
 *
 *   const things = ["foo", 123, null];
 *   type ThingKeys = Unionize<typeof things>;
 *   // ThingKeys is string | number | null
 *
 */
export type Unionize<T> = T extends readonly (infer U)[] ? U : never;
