import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core'
import Axios from 'axios';
import React, { useState } from 'react';
import ResultsTable from './Table'

export default () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(false);
  const [adminsDiff, setAdminsDiff] = useState({});
  const [groupDiff, setGroupDiff] = useState({});
  const [cityDiff, setCityDiff] = useState({});

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  }

  const handleGroupChange = ({ target: { value, name } }) => {
    data[name].investigation_group = value;

    setGroupDiff(x => ({ ...x, [data[name].id]: { investigation_group: value } }));
  }

  const handleCityChange = ({ value }, name) => {
    data[name].city = value;

    setCityDiff(x => ({ ...x, [data[name].id]: { city: value } }));
  }

  const handleAdminChange = ({ target: { checked, name } }) => {
    data[name].is_admin = checked;

    setAdminsDiff(x => ({ ...x, [data[name].id]: { is_admin: checked.toString() } }));
  }

  const handleClick = async () => {
    try {
      clear();

      const { data } = await Axios.get(`/api/users/${query}`);
      setData(data)
    } catch (e) {
      console.log(e);
      setError(true)
    }
  }

  const clear = () => {
    setError(false);
    setAdminsDiff({});
    setGroupDiff({});
    setCityDiff({});
  }

  const submit = async () => {
    const groups = Object.keys(groupDiff).map(x => ({ id: x, ...groupDiff[x] }))
    const cities = Object.keys(cityDiff).map(x => ({ id: x, ...cityDiff[x] }))
    const admins = Object.keys(adminsDiff).map(x => ({ id: x, ...adminsDiff[x] }))

    var response = { data: {} };

    try {
      response = await Axios.put(`/api/users`, { admins, groups, cities });
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        alert(`לא כל המשתמשים עודכנו. יש לקשר משתמש רק לנפה קיימת.`)
      }
    }

    alert('נא לבדוק בלוג את רשימת המשתמשים שעודכנו');
    console.log(response.data);
  }

  return (
    <Box className={classes.container}>
      <Box display='flex' width='100%' justifyContent='center' style={{ margin: '25px' }}>
        <Typography style={{ padding: '15px' }}>{'חיפוש לפי שם מלא או שם משתמש'}</Typography>
        <TextField
          value={query}
          onChange={handleChange}
          variant="outlined" />
        <Button className={classes.button} onClick={handleClick}>{'חפש'}</Button>
      </Box>
      {error && <Typography variant='h4'>{'אירעה שגיאה'}</Typography>}
      {data && <Box className={classes.centered}>
        <ResultsTable results={data} onGroupChange={handleGroupChange} onCityChange={handleCityChange} onAdminChange={handleAdminChange} />
        <Button onClick={submit} color='primary'>{'שמור'}</Button>
      </Box>}
    </Box>
  );
};

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: '8px 15px',
    height: 'fit-content',
    color: 'white',
    backgroundColor: 'rgb(240,149,175)',
  },
  centered: {
    display: 'flex',
    width: '95%',
    flexDirection: 'column',
    alignSelf: 'center'
  },
});
