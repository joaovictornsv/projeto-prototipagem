import { getCollection } from "../db.js"

const collectionLicensePlate = await getCollection('licensePlateDb')

export async function getOrCreateLicensePlate(licensePlate){
    const newLicensePlate = await collectionLicensePlate.findOne({"number": licensePlate.number})
    if(newLicensePlate){
        return newLicensePlate
    }
    return await collectionLicensePlate.insertOne(licensePlate)
}

export async function getLicensePlate(number){
    return await collectionLicensePlate.findOne({"number": number})
}