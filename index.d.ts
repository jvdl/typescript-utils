

namespace globalThis {
  interface JSON {
    stringify<T>(value: T, replacer?: null | undefined, space?: string | number): Stringified<T>;
    parse<T>(str: Stringified<T>, replacer?: null | undefined): JsonifiedObject<T>;
  };
}
