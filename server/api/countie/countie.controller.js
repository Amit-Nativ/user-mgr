import logger from '../../config/logger'
import pool from '../../config/pg'

export const turnOffAllCounties = async () => {
    try {
        await pool.query(`UPDATE public."user" SET is_active=false;
        UPDATE public."user" 
        SET is_active=true 
        WHERE id in (SELECT user_admin_id
                  FROM public.counties);`)
        logger.info('All users of all counties have been turned off')

        return 200;
    } catch (e) {
        logger.error(e);
    }
}
export const turnOffById = async ({ params: { id } }) => {
    try {
        await pool.query(`UPDATE public."user" SET is_active=false WHERE investigation_group='${id}';
        UPDATE public."user" 
        SET is_active=true 
        WHERE id=(SELECT user_admin_id
                  FROM public.counties
                  WHERE id=${id});`)
        logger.info(`All users of countie number ${id} have been turned off`)

        return 200;
    } catch (e) {
        logger.error(e);
        return 500;
    }
}