import React from 'react';
import {AutoComplete, Input} from 'antd';

const NavBar = ({options, onSelect, handleSearch}) => {
  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <Input.Search size='large' placeholder='Search surahs' enterButton />
    </AutoComplete>
  );
};
export default NavBar;
