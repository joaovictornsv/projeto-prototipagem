import { getCollection } from "../db.js"

const collectionDriver = await getCollection('driverDb')

export default async function getOrCreateDriver(driver){
    const newDriver = await collectionDriver.findOne({"document_number": driver.document_number})
    if(newDriver){
        return newDriver
    }
    return await collectionDriver.insertOne(driver)
}