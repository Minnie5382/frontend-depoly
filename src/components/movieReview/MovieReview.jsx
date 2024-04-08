import React from 'react';
import style from './MovieReview.module.css';

const MovieReview = () => {
  return (
    <div className={style.container}>
      <div className={style.topSection}>
        <div className={style.info}>
          <img src='' alt='Profile' className={style.profileImage} />
          <div className={style.infoBox}>
            <div className={style.level}>Lv.1 홍길동</div>
            <div className={style.time}>5분 전</div>
          </div>
        </div>
        <div className={style.stars}>★★★★☆</div>
      </div>
      <hr />
      <div className={style.content}>
        개꿀잼 영화! 간만에 재밌었다!개꿀잼 영화! 간만에 재밌었다!개꿀잼 영화!
        간만에 재밌었다!개꿀잼 영화! 간만에 재밌었다!개꿀잼 영화! 간만에
        재밌었다!개꿀잼 영화! 간만에 재밌었다! 개꿀잼 영화! 간만에
        재밌었다!개꿀잼 영화! 간만에 재밌었다!개꿀잼 영화! 간만에
        재밌었다!개꿀잼 영화! 간만에 재밌었다! 개꿀잼 영화! 간만에
        재밌었다!개꿀잼 영화! 간만에 재밌었다!개꿀잼 영화! 간만에 재밌었다!
      </div>
      <div className={style.likes}>
        <button className={style.likeButton}>👍</button> 10
      </div>
    </div>
  );
};

export default MovieReview;
