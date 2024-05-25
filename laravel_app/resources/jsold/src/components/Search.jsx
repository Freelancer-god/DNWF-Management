import React from 'react';

import styles from '../style';
import SearchInput from './SearchInput';

function Search() {
  return (
    <section className={`${styles.flexCenter} flex-col my-[50px]  w-full  `}>
      <div className="w-full sm:w-[35%]">
        <SearchInput />
      </div>

    </section>
  );
}

export default Search;
