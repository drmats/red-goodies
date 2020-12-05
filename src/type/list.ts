/**
 * Type tools.
 *
 * Typescript ^4.1.x tuple fun.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * Get head of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Hd = Head<List>;    // type Hd = 1;
 * ```
 */
export type Head<List> =
    List extends [infer X, ...any[]] ?
        X :
        never;




/**
 * Get tail of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Tl = Tail<List>;    // type Tl = [2, 3, 4];
 * ```
 */
export type Tail<List> =
    List extends [any, ...infer Xs] ?
        Xs :
        never;




/**
 * Get length of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Len = Length<List>;    // type Len = 4;
 * ```
 */
export type Length<List extends any[]> = List["length"];




/**
 * Construct new list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Cs = Cons<0, List>;    // type Cs = [0, 1, 2, 3, 4];
 * ```
 */
export type Cons<Car, Cdr extends any[] = []> = [Car, ...Cdr];




/**
 * Get all elements of the list except the last one.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type It = Init<List>;    // type It = [1, 2, 3];
 * ```
 */
export type Init<List> =
    List extends [any] ?
        [] :
        List extends [infer X, ...infer Xs] ?
            Cons<X, Init<Xs>> :
            never;




/**
 * Get last element of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Lt = Last<List>;    // type Lt = 4;
 */
export type Last<List> =
    List extends [infer X] ?
        X :
        List extends [any, ...infer Xs] ?
            Last<Xs> :
            never;




/**
 * Append one list at the other.
 *
 * ```
 * type List1 = [1, 2];
 * type List2 = [7, 8];
 * type Ap = Append<List1, List2>;    // type Ap = [1, 2, 7, 8];
 * ```
 */
export type Append<List1 extends any[], List2 extends any[]> =
    List1 extends [infer X, ...infer Xs] ?
        Cons<X, Append<Xs, List2>> :
        List2;




/**
 * Reverse the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Rev = Reverse<List>;    // type Rev = [4, 3, 2, 1];
 * ```
 */
export type Reverse<List extends any[], Acc extends any[] = []> =
    List extends [infer X, ...infer Xs] ?
        Reverse<Xs, Cons<X, Acc>> :
        Acc;




/**
 * Generate the list of list prefixes.
 *
 * ```
 * type List = [1, 2, 3];
 * type Ps = Prefixes<List>;    // type Ps = [[1], [1, 2], [1, 2, 3]];
 * ```
 */
export type Prefixes<List extends any[], Prefix extends any[] = []> =
    List extends [infer X, ...infer Xs] ?
        Cons<
            Reverse<Cons<X, Prefix>>,
            Prefixes<Xs, Cons<X, Prefix>>
        > :
        [];