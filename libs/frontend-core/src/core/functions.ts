// entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];

export function JsonToItrable<T, K = string>(
  o: Record<never, T> | ArrayLike<T>
): [K, T][] {
  return Object.entries<T>(o) as [K, T][];
}
