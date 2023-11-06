import {useRouter} from 'next/router';
import NavBar from './components/navbar';
import {Juz} from './constants';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {first, isNil} from 'lodash';
import {useStore} from './store';

export default function Home() {
  const router = useRouter();
  const [options, setOptions] = useState([]);
  const [surahList, setSurahList] = useState([]);

  const {surahNameStore, setSurahNameStore} = useStore((state) => state);

  const getSurahs = async () => {
    try {
      const response = await axios.get('http://api.alquran.cloud/v1/surah');
      const {data: responseData} = response.data;
      setSurahList(responseData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (value) => {
    const filteredOptions = surahList
      .filter((item) =>
        item.englishName.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => {
        return {
          number: item.number,
          value: item.englishName,
          label: `${item.englishName} (Surah ${item.number})`,
        };
      });

    setOptions(filteredOptions);
  };

  const onSelect = (value) => {
    const surah = first(options.filter((res) => res.value == value));
    setSurahNameStore(surah.label);
    localStorage.setItem('surahname', surah.label);
    router.push({
      pathname: '/surahs',
      query: {surahNumber: surah.number, surahName: surah.label},
    });
  };

  const handleButtonClick = (id) => {
    router.push({
      pathname: '/ayahs',
      query: {id},
    });
  };

  const getLocalData = () => {
    let value = localStorage.getItem('surahname');
    if (!isNil(value)) {
      setSurahNameStore(value);
    }
  };

  useEffect(() => {
    getLocalData();
    getSurahs();
  }, []);

  return (
    <div className='h-full bg-white dark:bg-slate-800 p-10'>
      <div className='flex items-center mb-5'>
        <NavBar
          options={options}
          onSelect={onSelect}
          handleSearch={handleSearch}
        />
      </div>
      <div className='grid grid-cols-4 gap-5'>
        {Juz.map((res) => {
          return (
            <button
              key={res.id}
              onClick={() => handleButtonClick(res.id)}
              className='p-4 rounded-md bg-gray-300 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 shadow-md hover:shadow-xl text-black dark:text-white'
            >
              <h1 className='mb-3 font-bold text-left'>{res.id}</h1>
              <h1 className='flex justify-between font-uthmanic-hafs'>
                {res.title}
                <p className='font-bold text-xl'>{res.arabic}</p>
              </h1>
            </button>
          );
        })}
      </div>
    </div>
  );
}
