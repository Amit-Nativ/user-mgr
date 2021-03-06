import logger from '../../config/logger'
import pool from '../../config/pg'

const usersStub = [
    { "user_name": "אמיל סופר", "id": "8372435", "phone_number": "0524846380", "investigation_group": "9999", "is_admin": "false", "city": "12" },
    { "user_name": "דביר בצלאלי", "id": "8360205", "phone_number": "0509900070", "investigation_group": "24", "is_admin": "false", "city": "12" },
    { "user_name": "דורין בביוף", "id": "8476535", "phone_number": "0502146039", "investigation_group": "23", "is_admin": "false", "city": "12" },
    { "user_name": "גיל צימרמן", "id": "8298195", "phone_number": "0528474791", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "חן ביטון", "id": "8457696", "phone_number": "0524846380", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "יובל נהון", "id": "8334095", "phone_number": "0586845386", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "יובל שלייפר", "id": "yuval.shlifer", "phone_number": "0525634482", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "ראובן פרנקס", "id": "reuven.franks", "phone_number": "0545691217", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "איתן קליין", "id": "eitan.klein", "phone_number": "0542117477", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "רדמילה דורפמן קבשה", "id": "radmilla.dorfman", "phone_number": "0549005258", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "יעקב רנד", "id": "yaakov.rand", "phone_number": "0545844797", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "פולינה וסילייב", "id": "polina.vasilev", "phone_number": "0538232901", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "נריה זדה", "id": "neria.zada", "phone_number": "0524347165", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "נעמה אליצור", "id": "naama.elitzur", "phone_number": "0538894203", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "אופק שרעבי", "id": "ofek.sharabi", "phone_number": "0544708108", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "אידית בן יעקב", "id": "idit.ben-yaakov", "phone_number": "0509161020", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "טליה גורפיל", "id": "talya.gorfin", "phone_number": "0505506150", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "שירה נורני", "id": "shira.norny", "phone_number": "0527518558", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "אורית לוי", "id": "orit.levy2", "phone_number": "0546702372", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "חנה ירוזלסקי", "id": "hana.ierozalski", "phone_number": "529533017", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "נופר ברמן", "id": "nofar.berman", "phone_number": "543551960", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עמית גנז", "id": "amit.genez", "phone_number": "509055571", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עידן וייצנר", "id": "eidan.weitzner", "phone_number": "524808629", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עומר בלסקי", "id": "8417267", "phone_number": "0547990224", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עידן אלי", "id": "8347636", "phone_number": "0503408844", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עידן אורי", "id": "8421124", "phone_number": "0502400745", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "עידן אטדגי", "id": "8377379", "phone_number": "0509503133", "investigation_group": "12", "is_admin": "false", "city": "12" },
    { "user_name": "מור גורן", "id": "goren.mor", "phone_number": "0504590440", "investigation_group": "12", "is_admin": "false", "city": "12" }];


export const getByQuery = async ({ params: { query } }) => {
    const result = await pool.query(
        `SELECT user_name,id,investigation_group,user_type,city	FROM public."user"	where	user_name like '%${query}%' OR id like '%${query}%'`
    );

    const users = result.rows.map(x => ({
        user_name: x['user_name'],
        id: x['id'],
        investigation_group: x['investigation_group'],
        is_admin: (x['user_type'] == 1 ? false : true),
        city: parseInt(x['city'])
    }))

    return users;
}

export const update = async (req, res) => {
    try {
        const { groups, admins, cities, names } = req.body;

        const updatedGroup = await updateInvestigationGroup(groups)
        const updatedCity = await updateCity(cities)
        const updatedNames = await updateNames(names)
        await turnOnOffAdmin(admins);

        res.status(200).send("updated users groups: " + updatedGroup + "\n updated admins:" + admins.map(x => x.id) + "\n updated users cities: " + updatedCity + "\n updated users names: " + updatedNames)
    }
    catch (e) {
        logger.error(e);
        res.status(400).send("failed updating investigation group/ city for all users")
    }
};


const turnOnOffAdmin = async (body) => {
    //EXPECT : [{"id": "ANSWER", "is_admin": "True/False"}]

    body.forEach(async (element) => {
        await pool.query(
            `UPDATE public."user" SET user_type=${element.is_admin == 'true' ? '2' : '1'} WHERE id='${element.id}'; `
        );
        logger.info(
            `successfully changed the status of the admin_id : ${element.id} to the following status: ${element.is_admin ? '2' : '1'}`
        );
    });
};

const updateInvestigationGroup = async (body) => {
    //EXPECT : {[{"id": "ANSWER", "ivestigation_group": "ANSWER"},{"id": "ANSWER", "ivestigation_group": "ANSWER"}]}
    var updated = []

    body.forEach(async (user) => {
        // console.log(user)
        try {
            var value = await pool.query(
                `UPDATE public."user" SET investigation_group='${user.investigation_group}' WHERE id='${user.id}'; `
            );

            updated.push(user.id)
        } catch (e) { logger.error(`could not update group for user ${user.id}`); }
    });

    return updated;
}

const updateCity = async (body) => {
    //EXPECT : {[{"id": "ANSWER", "city": "ANSWER"},{"id": "ANSWER", "city": "ANSWER"}]}
    var updated = []

    body.forEach(async (user) => {
        // console.log(user)
        try {
            var value = await pool.query(
                `UPDATE public."user" SET city='${user.city}' WHERE id='${user.id}'; `
            );

            updated.push(user.id)
        } catch (e) { logger.error(`could not update city for user ${user.id}`); }
    });

    return updated;
}

const updateNames = async (body) => {
    //EXPECT : {[{"id": "ANSWER", "user_name": "ANSWER"},{"id": "ANSWER", "user_name": "ANSWER"}]}
    var updated = []

    body.forEach(async (user) => {
        // console.log(user)
        try {
            var value = await pool.query(
                `UPDATE public."user" SET user_name='${user.user_name}' WHERE id='${user.id}'; `
            );

            updated.push(user.id)
        } catch (e) { logger.error(`could not update user_name for user ${user.id}`); }
    });

    return updated;
}