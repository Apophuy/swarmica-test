import { useGetInstanceQuery } from '../store/queries';
import styles from './styles.module.scss';

function App() {
  const { data, error, isLoading } = useGetInstanceQuery();

  console.log('Instance data:', data);
  console.log('Loading:', isLoading);
  if (error) {
    console.error('Error:', error);
  }

  return (
    <div className={styles.app}>
      <h1>Swarmica Test App</h1>
    </div>
  );
}

export default App;
