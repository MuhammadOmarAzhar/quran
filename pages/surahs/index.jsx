import React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Loader from '../components/loader';

const Surah = () => {
  const [ayah, setAyah] = useState([]);
  const [translation, setTranslation] = useState('');
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const {surahNumber, surahName} = router.query;

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
      setTranslation(translation);
      setAyah(ayahs);
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
              {surahName}
            </div>
            {ayah.map((res, index) => {
              return (
                <div
                  key={res.number}
                  className='text-black dark:text-white p-4 m-3 border rounded-md'
                >
                  <h1>
                    {surahNumber}:{translation[index].numberInSurah}
                  </h1>
                  <h1 className='font-bold text-2xl text-right font-uthmanic-hafs'>
                    {res.text}
                  </h1>
                  <h1 className='font-semibold'>
                    Translation: <br />
                  </h1>
                  <p>{translation[index].text}</p>
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
