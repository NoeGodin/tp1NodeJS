import {readFile, writeFile} from 'node:fs/promises'
import {getDate} from "./divers.js";
import {createHash} from 'node:crypto'
import { v4 as uuidv4 } from 'uuid';


/* Chemin de stockage des blocks */
const path = './data/blockchain.json'

/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    return new Promise((resolve,reject)=> {
        readFile(path, {encoding:'utf8'}).then((result)=>{
            resolve(JSON.parse(result))
        }).catch((error) => {
            reject(error)
        })
    })
}

/**
 * Trouve un block à partir de son id
 * @param id
 * @return {Promise<Block[]>}
 */
export async function findBlock(id) {
    const blocks = await findBlocks()
    const block = blocks.find(block => block.id === id)
    if (!block) {
        return JSON.stringify({erreur : "Block indisponible",etat:"non fiable"});
    }
    return block
}

/**
 * Verifie que chaque block a bien le bon hachage
 * @return {Promise<Block[]>}
 */
export async function verifBlocks() {
    const blocks = await findBlocks();
    let chaineValide = true;

    blocks.forEach((block, i) => {
        if (i > 0) {
            const blockPrecedent = blocks[i - 1];
            const previousBlockString = JSON.stringify(blockPrecedent);

            const hashAObtenir = createHash('sha256').update(previousBlockString).digest('hex')
            if (hashAObtenir !== block.hash) {
                chaineValide = false;
            }
        }
    });
    return JSON.stringify(chaineValide);
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks()
    return blocks[blocks.length - 1] || null
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const lastBlock = await findLastBlock();
    const previousBlockString = JSON.stringify(lastBlock);

    const id = uuidv4()
    const nom = contenu.nom
    const don = contenu.don
    const date = getDate()
    let hash = null;
    if (lastBlock!=null) {
        hash = createHash('sha256').update(previousBlockString).digest('hex')
    }
    const json = {id,nom,don,date,hash};
    console.log(json)
    let jsonArr = await findBlocks()
    jsonArr.push(json)
    return new Promise((resolve,reject)=> {
            writeFile(path, JSON.stringify(jsonArr,null,2),{encoding:'utf8'}).then((result)=>{
                resolve("requête effectuée avec succès")
            }).catch((error) => {
                reject("erreur: "+error)
            })
    })
}

