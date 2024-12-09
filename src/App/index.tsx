import { useGetArticlesQuery, useGetCategoriesQuery, useGetInstanceQuery } from '../store/queries';
import { Locales, Status, TSearchParams } from '../types';
import { Input, Select, Space, Card, Typography, Empty, Spin, Tag, message } from 'antd';
import { useState, useCallback, useEffect } from 'react';
import styles from './styles.module.scss';
import { useDebounce } from '../hooks';
import { STATUS_COLORS, STATUS_OPTIONS } from '../constants';
import Link from 'antd/es/typography/Link';
import { TArticle } from '../api/replies';
import cn from 'classnames';

const { Search } = Input;
const { Title, Text } = Typography;

function App() {
  // Состояние формы поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocale, setSelectedLocale] = useState<Locales>(Locales.ru);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<Status | undefined>();
  const [searchParams, setSearchParams] = useState<TSearchParams>();
  const [viewedArticles, setViewedArticles] = useState<TArticle[]>([]);

  useEffect(() => {
    const savedArticles = localStorage.getItem('savedArticles');
    if (!savedArticles) {
      localStorage.setItem('savedArticles', JSON.stringify([]));
      setViewedArticles([]);
    } else {
      setViewedArticles(JSON.parse(savedArticles));
    }
  }, []);
  console.log('viewedArticles: ', viewedArticles);

  // Обработчик клика по карточке
  const handleCardClick = useCallback((article: TArticle) => {
    if (article.public_urls[selectedLocale]) {
      window.open(article.public_urls[selectedLocale], '_blank');
      const updatedArticles = [...viewedArticles, article];
      localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
      setViewedArticles(updatedArticles);
    }
  }, []);

  // Получение данных инстанса для списка локалей
  const { data: instance } = useGetInstanceQuery();

  // Получение списка категорий
  const { data: categories } = useGetCategoriesQuery(
    {
      limit: 100,
      offset: 0,
      ordering: 'id',
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  // Поиск статей с выбранными фильтрами
  const { data: articles, isLoading: isArticlesLoading } = useGetArticlesQuery(
    searchParams ?? { search: '' },
    {
      skip: !searchParams,
      refetchOnMountOrArgChange: false,
    }
  );

  // Обработчик поиска с debounce
  const handleSearchWithParams = useCallback(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length < 1) {
      message.warning(
        selectedLocale === Locales.ru
          ? 'Поисковый запрос должен содержать минимум 1 символ'
          : 'The search query must contain a minimum of 1 character'
      );
      return;
    }

    setSearchParams({
      search: searchQuery,
      category: selectedCategory,
      locale: selectedLocale,
      status: selectedStatus ? [selectedStatus] : undefined,
    });
  }, [searchQuery, selectedCategory, selectedLocale, selectedStatus]);

  const handleSearch = useDebounce(handleSearchWithParams, 500);

  // Форматирование даты
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString(selectedLocale || 'ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title level={2}>{selectedLocale === Locales.ru ? 'Поиск статей' : 'Article Search'}</Title>

        <Space direction='vertical' size='middle' style={{ width: '100%', marginBottom: 20 }}>
          {/* Строка поиска */}
          <Search
            placeholder={selectedLocale === Locales.ru ? 'Поиск...' : 'Search articles...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton
            style={{ width: '100%' }}
            loading={isArticlesLoading}
          />

          <Space wrap>
            {/* Выбор локали */}
            <Select
              style={{ width: 120 }}
              placeholder={selectedLocale === Locales.ru ? 'Выберите язык' : 'Select locale'}
              value={selectedLocale}
              onChange={setSelectedLocale}
              options={instance?.locales.map((locale) => ({
                label: locale.toUpperCase(),
                value: locale,
              }))}
            />

            {/* Выбор категории */}
            <Select
              style={{ width: 200 }}
              placeholder={selectedLocale === Locales.ru ? 'Выберите категорию' : 'Select category'}
              value={selectedCategory}
              onChange={setSelectedCategory}
              allowClear
              options={categories?.results.map((category) => ({
                label: category.name[selectedLocale || Locales.ru],
                value: category.id,
              }))}
            />

            {/* Выбор статуса */}
            <Select
              style={{ width: 150 }}
              placeholder={selectedLocale === Locales.ru ? 'Выберите статус' : 'Select status'}
              value={selectedStatus}
              onChange={setSelectedStatus}
              allowClear
              options={STATUS_OPTIONS.map((status) => ({
                label: status,
                value: status,
              }))}
            />
          </Space>
        </Space>

        {/* Результаты поиска */}
        {isArticlesLoading ? (
          <div className={styles.centered}>
            <Spin size='large' />
          </div>
        ) : articles?.results.length ? (
          <Space direction='vertical' size='middle' style={{ width: '100%' }}>
            {articles.results.map((article) => (
              <Card
                key={article.id}
                size='small'
                className={cn(styles.articleCard, {
                  [styles.articleCard__viewed]: viewedArticles.find((a) => a.id === article.id),
                })}
                title={
                  <Space>
                    <Text>
                      {selectedLocale === Locales.ru
                        ? `Статья №${article.id}`
                        : `Article #${article.id}`}
                    </Text>
                    <Tag color={STATUS_COLORS[article.status as Status]}>{article.status}</Tag>
                  </Space>
                }
                onClick={() => handleCardClick(article)}
              >
                <Space direction='vertical' style={{ width: '100%' }}>
                  <div className={styles.articleInfo}>
                    <Text type='secondary'>
                      {selectedLocale === Locales.ru ? 'Внешний ID:' : 'External ID:'}
                    </Text>
                    <Text>{article.ext_id}</Text>
                  </div>

                  {article.author && (
                    <div className={styles.articleInfo}>
                      <Text type='secondary'>
                        {selectedLocale === Locales.ru ? 'Автор:' : 'Автор:'}
                      </Text>
                      <Text>{article.author}</Text>
                    </div>
                  )}

                  {article.title[selectedLocale] && article.public_urls[selectedLocale] && (
                    <div className={styles.articleInfo}>
                      <Text type='secondary'>
                        {selectedLocale === Locales.ru ? 'Название:' : 'Title:'}
                      </Text>
                      <Link href={article.public_urls[selectedLocale]} target='_blank'>
                        {article.title[selectedLocale]}
                      </Link>
                    </div>
                  )}

                  <div className={styles.articleInfo}>
                    <Text type='secondary'>
                      {selectedLocale === Locales.ru ? 'Ранг:' : 'Rank:'}
                    </Text>
                    <Text>{article.rank}</Text>
                  </div>

                  <div className={styles.dates}>
                    <div className={styles.articleInfo}>
                      <Text type='secondary'>
                        {selectedLocale === Locales.ru ? 'Создан:' : 'Created:'}
                      </Text>
                      <Text>{formatDate(article.created_at)}</Text>
                    </div>

                    <div className={styles.articleInfo}>
                      <Text type='secondary'>
                        {selectedLocale === Locales.ru ? 'Обновлен:' : 'Updated:'}
                      </Text>
                      <Text>{formatDate(article.updated_at)}</Text>
                    </div>

                    {article.published_at && (
                      <div className={styles.articleInfo}>
                        <Text type='secondary'>
                          {selectedLocale === Locales.ru ? 'Опубликован:' : 'Published:'}
                        </Text>
                        <Text>{formatDate(article.published_at)}</Text>
                      </div>
                    )}
                  </div>
                </Space>
              </Card>
            ))}
          </Space>
        ) : (
          <Empty
            description={selectedLocale === Locales.ru ? 'Статьи не найдены' : 'No articles found'}
          />
        )}
      </Card>
    </div>
  );
}

export default App;
