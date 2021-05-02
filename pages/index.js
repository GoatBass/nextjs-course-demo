import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content='Browse a huge list of hihly active React meetups' ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     //fetch data from an API

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     };
// };

export async function getStaticProps() {
    //this code will be executed only in the build process. Never in server or the client site.

    const client = await MongoClient.connect('mongodb+srv://eduard:GoatBass94@cluster0.wi5u6.mongodb.net/meetups?retryWrites=true&w=majority')

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10, //With this, we make sure our data is never older than 10 seconds.
    };
};

export default HomePage;