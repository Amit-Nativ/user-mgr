import logger from '../../config/logger'
import pool from '../../config/pg'

export const turnOffAllCounties = async () => {
    try {
        await pool.query(`UPDATE public."user" SET is_active=false;`)
        logger.info('All users of all counties have been turned off')

        return 200;
    } catch (e) {
        logger.error(e);
    }
}
export const turnOffById = async ({ params: { id } }) => {
    try {
        await pool.query(`UPDATE public."user" SET is_active=false WHERE id LIKE '${id}';`)
        logger.info(`All users of countie number ${id} have been turned off`)

        return 200;
    } catch (e) {
        logger.error(e);
    }
}