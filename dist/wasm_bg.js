import * as wasm from './wasm_bg.wasm';

let cachegetFloat32Memory0 = null;
function getFloat32Memory0() {
    if (cachegetFloat32Memory0 === null || cachegetFloat32Memory0.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getFloat32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function getArrayI32FromWasm0(ptr, len) {
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}
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
export function cluster(positions, threshold, zoom_level) {
    try {
        const retptr = wasm.__wbindgen_export_0.value - 16;
        wasm.__wbindgen_export_0.value = retptr;
        var ptr0 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.cluster(retptr, ptr0, len0, threshold, zoom_level);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v1 = getArrayI32FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 4);
        return v1;
    } finally {
        wasm.__wbindgen_export_0.value += 16;
    }
}

