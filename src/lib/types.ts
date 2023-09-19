export type Option<T> = T | {};

export type Pretify<T> = {
    [P in keyof T]: T[P];
} & {};