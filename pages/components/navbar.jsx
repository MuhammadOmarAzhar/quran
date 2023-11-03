import React, {useEffect, useState} from 'react';
import {AutoComplete, Input} from 'antd';
import axios from 'axios';
import {useRouter} from 'next/router';

const App = () => {
  const [options, setOptions] = useState([]);
  const [surahList, setSurahList] = useState([]);
  const [selectedSurahNumber, setSelectedSurahNumber] = useState();
  const router = useRouter();

  const getSurahs = async () => {
    try {
      const response = await axios.get('http://api.alquran.cloud/v1/surah');
      const surahs = response.data.data.map((surah) => surah.englishName);
      const surahnum = response.data.data.map((surahNo) => surahNo.number);
      setSurahList(surahs);
      setSelectedSurahNumber(surahnum);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSurahs();
  }, []);
  const handleSearch = (value) => {
    const filteredOptions = surahList
      .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
      .map((item, index) => ({
        value: item,
        label: `${item} (Surah ${selectedSurahNumber[index]})`,
      }));

    setOptions(filteredOptions);
  };
  const onSelect = (value) => {
    const surahNumber =
      selectedSurahNumber[
        options.findIndex((option) => option.value === value)
      ];

    if (surahNumber) {
      router.push({
        pathname: '/surahs',
        query: {surahNumber: surahNumber, surahName: value},
      });
    }
  };
  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size='large'
    >
      <Input.Search size='large' placeholder='Search surahs' enterButton />
    </AutoComplete>
  );
};
export default App;
