import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';

const Ayahs = () => {
  const [ayah, setAyah] = useState([]);
  const [translation, setTranslation] = useState('');
  const [surah, setSurah] = useState();
  const [ayahNum, setAyahNum] = useState();
  const router = useRouter();
  const {id} = router.query;

  useEffect(() => {
    if (id) {
      fetchJuz(id);
    }
  }, [id]);

  const getAyahs = async (id) => {
    try {
      const [englishData, ArabicData] = await Promise.all([
        axios.get(`http://api.alquran.cloud/v1/juz/${id}/en.asad`),
        axios.get(`http://api.alquran.cloud/v1/juz/${id}/quran-uthmani`),
      ]);

      debugger;

      const ayahs = ArabicData.data.data.ayahs;
      const translation = englishData.data.data.ayahs;
      const ayahnum = ayahs.number;
      setTranslation(translation);
      setAyah(ayahs);
      debugger;
      setAyahNum(ayahnum);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchJuz = async (id) => {
    try {
      await getAyahs(id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='bg-white dark:bg-slate-800 text-black p-10 grid grid-cols-1'>
      {ayah.map((res, index) => {
        return (
          <div
            key={res.number}
            className='text-black dark:text-white p-4 m-3 border rounded-md'
          >
            <h1>
              {translation[index].surah.number}:
              {translation[index].numberInSurah}
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
  );
};

export default Ayahs;
