import ReactMarkdown from 'react-markdown';
import SwiperCore, { Scrollbar, Mousewheel, Navigation, Pagination, Autoplay } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import { apiRoutes, assetPrefix } from '../../api';

import useSwiperRef from './useSwiperRef';

SwiperCore.use([Scrollbar, Mousewheel, Navigation, Pagination, Autoplay]);

const NewsTags = ({ tags }) => {
  return (
    <ul className="news__tag-list">
      {tags.map((tag, id) => {
        return (
          <li key={id} className="news__tag-item">
            <a href="">#{tag}</a>
          </li>
        );
      })}
    </ul>
  );
};

const NewsSource = ({ source }) => (
  <dl className="news__source">
    <dt>Источник:</dt>
    <dd>
      <a href={source}>{source}</a>
    </dd>
  </dl>
);

const NewsItem = ({ item: { body, img_src } }) => {
  return (
    <>
      <div className="news__img">
        <img src={`${assetPrefix}/${apiRoutes.IMAGES}/${img_src}`} alt="" />
      </div>
      <div className="news__content">
        <ReactMarkdown>{body}</ReactMarkdown>
        {/* <NewsTags tags={post.tags} /> */}
        {/* <NewsSource source={post.source} /> */}
      </div>
    </>
  );
};

const News = ({ news }) => {
  const [, nextElRef] = useSwiperRef();
  const [, prevElRef] = useSwiperRef();

  return (
    news && (
      <section id="news" className="news">
        <div className="wrapper">
          <h2 className="section-title news__title">Новости</h2>
          <div className="news__news-container">
            <div className="news__swiper-wp">
              <Swiper
                pagination
                slidesPerView={1}
                autoplay
                loop
                tag="div"
                navigation={{
                  prevEl: '.news__swiper-btn--prev',
                  nextEl: '.news__swiper-btn--next',
                }}
              >
                {news.map((item) => {
                  return (
                    <SwiperSlide tag="li" key={item.id} className="news__item">
                      <NewsItem item={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="news__swiper-controls">
              <span ref={prevElRef} className="news__swiper-btn news__swiper-btn--prev"></span>
              <span ref={nextElRef} className="news__swiper-btn news__swiper-btn--next"></span>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default News;
