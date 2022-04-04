/* tslint:disable */
/* eslint-disable */
/**
* Cluster a set of geographical points such that the centroids of the remaining clusters are no
* closer than `threshold`.
*
* - `positions`: A vector of `f32` lat-lng pairs. Must be even.
* - `threshold`: The closest allowed distance, in the WebMercator coordinate system, between two
*                cluster centroids.
* - `zoom_level`: The zoom level in WebMercator projection at which the `threshold` distance is
*                considered.
*
* The return value is a run-length encoded `i32` array of cluster members, i.e.:
*   `[len1,x1,y1,member1-1,member1-2,...,len2,x2,y2,member2-1,member2-2,...]`
*
* # Panics
*
* This function panics if the length of `positions` is not even.
* @param {Float32Array} positions
* @param {number} threshold
* @param {number} zoom_level
* @returns {Int32Array}
*/
export function cluster(positions: Float32Array, threshold: number, zoom_level: number): Int32Array;
