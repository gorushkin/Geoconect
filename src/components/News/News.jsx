import ReactMarkdown from 'react-markdown';

const NewsTags = ({ tags }) => {
  return (
    <ul className='news__tag-list'>
      {tags.map((tag, id) => {
        return (
          <li key={id} className='news__tag-item'>
            <a href=''>#{tag}</a>
          </li>
        );
      })}
    </ul>
  );
};

const NewsSource = ({ source }) => (
  <dl className='news__source'>
    <dt>Источник:</dt>
    <dd>
      <a href={source}>{source}</a>
    </dd>
  </dl>
);

const News = ({ posts }) => {
  return (
    <section id='news' className='news'>
      <div className='wrapper'>
        <h2 className='section-title news__title'>Новости</h2>
        <ul className='news__list'>
          {posts.map((post) => {
            return (
              <li key={post.id} className='news__item'>
                <div className='news__img'>
                  <img src='news__img01.jpg' alt='' />
                </div>
                <div className='news__content'>
                  <ReactMarkdown>{post.body}</ReactMarkdown>
                  <NewsTags tags={post.tags} />
                  <NewsSource source={post.source} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default News;
