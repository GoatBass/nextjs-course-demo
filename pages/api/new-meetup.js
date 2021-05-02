import { MongoClient } from 'mongodb'

// api/new-meetup

async function handler(req, res) {
    //The req (request) object contains data about the incoming request.
    //The res (response) object will be needed for sending back a response.
    if(req.method === 'POST'){
        const data = req.body;
        
        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://eduard:GoatBass94@cluster0.wi5u6.mongodb.net/meetups?retryWrites=true&w=majority')

        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted!' });

    }
}

export default handler;