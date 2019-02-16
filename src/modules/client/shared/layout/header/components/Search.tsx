import * as React from 'react';

const S = require('../styles/SearchBar.scss')

const SearchBar = () => (
  <div className={S['search-bar']}>
    <input placeholder="Bạn muốn tìm gì?"/>
  </div>
)

export default SearchBar
