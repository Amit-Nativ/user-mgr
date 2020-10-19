import { Client } from 'pg'

const client = new Client()

client.connect().then(() => console.log('connected'))
    .catch(err => console.log(`err: ${err}`));

export const updateUser = ({ user }) => {
    console.log('a')
}
