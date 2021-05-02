//our-domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetup = () => {

    const router = useRouter();

    const addMeetUpHandler = async (enteredMeetUpData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetUpData),
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add a new New Meetup</title>
                <meta 
                    name='description'
                    content='Add your own meetups and create amazing networking opportunities'
                />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetUpHandler} />
        </Fragment>
    );
};

export default NewMeetup;