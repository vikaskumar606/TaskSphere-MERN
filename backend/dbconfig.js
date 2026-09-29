import { MongoClient } from "mongodb"
const url = "mongodb+srv://00vikaskumar606_db_user:r8x3qzWYy1fBH968@cluster0.6ibgsna.mongodb.net/?appName=Cluster0"
const dbName = "node-project"
export const collectionName="todo"
const client = new MongoClient(url,{
    tlsAllowInvalidCertificates:true
})
export const connection =async ()=>{
    await client.connect()
    return client.db(dbName)
 }
