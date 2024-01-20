import React from 'react';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import UserCard from './cards/UserCard';

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
};

const UserSlider = ({ listUser }) => {
  return (
    <Slider {...settings} className='mb-10'>
      {listUser.map((i, idx) => (
        <UserCard userId={i.id} username={i.name} avatarURL={i.avatarURL} key={idx} />
      ))}
    </Slider>
  );
};

export default UserSlider;
