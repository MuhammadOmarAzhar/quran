import {useRouter} from 'next/router';
import axios from 'axios';
import {useEffect, useState} from 'react';

const Ayahs = () => {
  const [ayah, setAyah] = useState('');
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
      const juz = await axios.get(
        `http://api.alquran.cloud/v1/juz/${id}/en.asad`
      );
      debugger;
      const ayahs = juz.data.ayahs;
      const text = ayahs.text;
      return text;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchJuz = async (id) => {
    try {
      debugger;
      let res = await getAyahs(id);
      setAyah(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <div className='bg-white dark:bg-slate-800 text-black'>id:{id}</div>;
};

export default Ayahs;
