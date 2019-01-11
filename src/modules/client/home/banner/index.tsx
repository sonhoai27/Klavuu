import * as React from 'react'
import Slider from '@app/modules/client/shared/layout/slider/Slider';

const Banner = () => {
  return <Slider height={400} autoChangeTime={4000} images={[
    {
      // tslint:disable-next-line:max-line-length
      img: 'https://cdn.shopify.com/s/files/1/0543/8301/files/KakaoTalk_Photo_2019-01-07-16-40-13_1280x.jpeg',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0543/8301/files/GGWEB_1280x.jpeg',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0543/8301/files/SleepSets_Banner_1280x.jpg',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0543/8301/files/sweetchefdesktop_1280x.jpeg',
    },
    {
      // tslint:disable-next-line:max-line-length
      img: 'https://cdn.shopify.com/s/files/1/0543/8301/files/KakaoTalk_20181130_100323405_1280x.jpg',
    },
  ]} />
}

export default Banner
