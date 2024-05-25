/* eslint-disable react/no-array-index-key */
import React from 'react';

import styles from '../style';

function SeparateSection({ border = 1 }) {
  return (
    <section className={`${styles.flexCenter} flex-col xxs:[70px] xs:my-[50px]  w-full  `}>
      <div className={`w-full h-[${border}px] bg-grayBorder mt-7`} />
    </section>
  );
}

export default SeparateSection;
