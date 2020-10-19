import {seed} from 'mongoose-plugin-seed';
import logger from 'env-bunyan';
import mongoose from 'mongoose';
import inProduction from 'in-production';

mongoose.connect(process.env.MONGO_URI);

export default () => {
    if (inProduction || process.env.SEED_DB === 'false') {
        return Promise.resolve();
    }

    return seed()
        .then(() => {
            logger.info('Finished populating database.');
        })
        .catch(error => {
            logger.error({error}, 'Unable to populate database');
        });
};