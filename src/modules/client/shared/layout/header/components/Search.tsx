import * as React from 'react';
import { withNamespaces } from 'react-i18next';

const S = require('../styles/SearchBar.scss')

interface ISearchBarProps {
  t?: any;
}

const SearchBar = ({ t }: ISearchBarProps) => (
  <div className={S['search-bar']}>
    <input placeholder={t('MENU_WHAT_ARE_YOU_LOOKING_FOR')}/>
  </div>
)

export default withNamespaces()(SearchBar as any)
