import styles from './styles.module.scss';
// import { apiPath } from '../api/paths';
// import { useEffect } from 'react';

function App() {
  // const { data, error, isLoading, refetch } = useGetDataQuery(apiPath.instance);

  // const data2 = async () => {
  //   const res = await fetch(`${apiPath.base}${apiPath.instance}`);
  //   const data = await res.json();

  //   return data;
  // };

  // useEffect(() => {
  //   data2().then(() => {});
  // }, []);

  // console.log('data: ', data);

  return (
    <div className={styles.container}>
      <h1>Работает</h1>
    </div>
  );
}

export default App;
