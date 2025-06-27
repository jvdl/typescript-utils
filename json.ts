import { Brand } from "generics";
// not sure why this isn't working as intended yet.
// See https://www.youtube.com/watch?v=z7pDvyVhUnE
export type JsonifiedValue<T> = T extends string | number | null | boolean
? T 
: T extends {toJSON(): infer R} ? R
: T extends undefined | ((...args: any[]) => any) ? never
: T extends object ? JsonifiedObject<T>
: never;

export type JsonifiedObject<T> = {
  [Key in keyof T as [JsonifiedValue<T[Key]>] extends [never] ? never : Key]: JsonifiedValue<T[Key]>
}

export type Stringified<ObjType> = string & Brand<ObjType>;
