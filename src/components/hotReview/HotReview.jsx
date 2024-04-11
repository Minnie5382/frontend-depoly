import React from 'react';
import style from './HotReview.module.css';
import logo from '../../assets/logo.png';

const HotReview = ({
  moviePoster,
  movieName,
  reviewer,
  star,
  content,
  like,
}) => {
  return (
    <div className={style.container}>
      <div className={style.reviewBox}>
        <img className={style.moviePoster} src={logo} />
        <div className={style.movieReview}>
          <div className={style.nameSpan}>
            <span className={style.movieName}>{movieName}어바웃타임</span>
            <span>{star}</span>
          </div>
          <div className={style.divisionLine} />
          <div className={style.contentBox}>
            {reviewer}김길자
            <div className={style.reviewContent}>
              어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고어쩌고저쩌고
              {content}
            </div>
            <div className={style.likeCount}>👍100{like}</div>
          </div>
        </div>
        {/* <div className={style.likeCount}>굿100</div> */}
      </div>
    </div>
  );
};
export default HotReview;
