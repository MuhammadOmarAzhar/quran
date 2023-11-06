import React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Loader from '../components/loader';
import {useStore} from '../store';

const Surah = () => {
  const [ayah, setAyah] = useState([]);
  const [translation, setTranslation] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const {surahNumber} = router.query;

  const {
    surahNameStore,
    translationStore,
    setTranslationStore,
    ayahStore,
    setAyahStore,
  } = useStore((state) => state);

  const getSurahs = async () => {
    try {
      setLoader(true);
      const [englishData, ArabicData] = await Promise.all([
        axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`),
        axios.get(
          `http://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
        ),
      ]);

      const ayahs = ArabicData.data.data.ayahs;
      const translation = englishData.data.data.ayahs;
      setTranslationStore(translation);
      setAyahStore(ayahs);
    } catch (error) {
      console.log(error.message);
    }
    setLoader(false);
  };

  useEffect(() => {
    getSurahs();
  }, []);

  return (
    <>
      {loader ? (
        <Loader loading={true} />
      ) : (
        <>
          <div className='bg-white dark:bg-slate-800 text-black p-10 grid grid-cols-1'>
            <div className='text-center font-uthmanic-hafs text-black dark:text-white text-4xl'>
              {surahNameStore}
            </div>
            {ayahStore.map((res, index) => {
              return (
                <div
                  key={res.number}
                  className='text-black dark:text-white p-4 m-3 border rounded-md'
                >
                  <h1>
                    {surahNumber}:{translationStore[index].numberInSurah}
                  </h1>
                  <h1 className='font-bold text-2xl text-right font-uthmanic-hafs'>
                    {res.text}
                  </h1>
                  <h1 className='font-semibold'>
                    Translation: <br />
                  </h1>
                  <p>{translationStore[index].text}</p>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Surah;
