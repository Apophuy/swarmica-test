import { useGetArticlesQuery, useGetCategoriesQuery, useGetInstanceQuery } from '../store/queries';
import { Locales } from '../types';
import styles from './styles.module.scss';

function App() {
  const { data, error, isLoading } = useGetInstanceQuery();

  console.log('Instance data:', data);
  console.log('Loading:', isLoading);
  if (error) {
    console.error('Error:', error);
  }

  const { data: categories } = useGetCategoriesQuery({
    limit: 5,
    offset: 0,
    ordering: 'id',
    public: true,
  });

  console.log('Categories:', categories);

  const { data: articles } = useGetArticlesQuery({
    search: 'aaa',
    category: undefined,
    locale: Locales.ru,
    status: undefined,
  });

  console.log('Articles:', articles);

  return (
    <div className={styles.app}>
      <h1>Swarmica Test App</h1>
    </div>
  );
}

export default App;
