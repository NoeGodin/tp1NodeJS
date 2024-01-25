import {createBlock, findBlock, findBlocks,verifBlocks} from "./blockchainStorage.js";
import {json} from "node:stream/consumers"

export async function liste(req, res, url) {
    return findBlocks()
}

export async function verif() {
    return verifBlocks()
}

export async function find(id) {
    return findBlock(id)
}

export async function create(req, res) {
    return createBlock(await json(req))
}
