import {useRouter} from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleButtonClick = (id) => {
    router.push({
      pathname: '/ayahs',
      query: {id},
    });
  };
  const juz = [
    {
      id: 1,
      title: 'Alif Lam Meem',
      arabic: 'آلم',
    },
    {
      id: 2,
      title: 'Sayaqūl',
      arabic: 'سيقول السفهاء',
    },
    {
      id: 3,
      title: 'Tilka -r-rusul',
      arabic: 'تلك الرسل',
    },
    {
      id: 4,
      title: 'Lan Tana Lu',
      arabic: 'لن تنالوا',
    },
    {
      id: 5,
      title: 'W-al-muḥṣanāt',
      arabic: 'والمحصنات',
    },
    {
      id: 6,
      title: 'Lā yuẖibbu-llāh',
      arabic: 'لا يحب الله',
    },
    {
      id: 7,
      title: 'Wa idha sami ū',
      arabic: 'وإذا سمعوا',
    },
    {
      id: 8,
      title: 'Wa law annanā',
      arabic: 'ولو أننا',
    },
    {
      id: 9,
      title: 'Qāl al-malā',
      arabic: 'قال الملأ',
    },
    {
      id: 10,
      title: 'W-aʿlamū',
      arabic: 'واعلموا',
    },
    {
      id: 11,
      title: 'Ya tadhirūna',
      arabic: 'يعتذرون',
    },
    {
      id: 12,
      title: 'Wa mā min dābbah',
      arabic: 'ومامن دابة',
    },
    {
      id: 13,
      title: 'Wa mā ubarri u',
      arabic: 'وما أبرئ',
    },
    {
      id: 14,
      title: 'Ruba Ma',
      arabic: 'ربما',
    },
    {
      id: 15,
      title: 'Subḥāna -lladhi',
      arabic: 'سبحٰن الذیٓ',
    },
    {
      id: 16,
      title: 'Qāla a-lam',
      arabic: 'قال ألم',
    },
    {
      id: 17,
      title: 'Iqtaraba li-n-nās',
      arabic: 'اقترب للناس',
    },
    {
      id: 18,
      title: 'Qad aflaḥa',
      arabic: 'قد أفلح',
    },
    {
      id: 19,
      title: 'Wa-qāla -lladhīna',
      arabic: 'وقال الذين',
    },
    {
      id: 20,
      title: 'Amman khalaqa',
      arabic: 'امن خلق',
    },
    {
      id: 21,
      title: 'Otlu maa oohiya',
      arabic: 'اتل مآ اوحی',
    },
    {
      id: 22,
      title: 'Wa-man yaqnut',
      arabic: 'ومن يقنت',
    },
    {
      id: 23,
      title: 'Wama liya',
      arabic: 'ومالی',
    },
    {
      id: 24,
      title: 'Fa-man aẓlamu',
      arabic: 'فمن أظلم',
    },
    {
      id: 25,
      title: 'Ilaihi yuraddu',
      arabic: 'إليه يرد',
    },
    {
      id: 26,
      title: 'Ḥāʾ Mīm',
      arabic: 'حـم',
    },
    {
      id: 27,
      title: 'Qāla fa-mā khatbukum',
      arabic: 'قال فما خطبكم',
    },
    {
      id: 28,
      title: 'Qad samiʿa -llāhu',
      arabic: 'قد سمع اللہ',
    },
    {
      id: 29,
      title: 'Tabāraka -lladhi',
      arabic: 'تبٰرک الذی',
    },
    {
      id: 30,
      title: 'ʿAmma',
      arabic: '	عمّ',
    },
  ];

  return (
    <div className='h-full bg-white dark:bg-slate-800 p-10'>
      <div className='grid grid-cols-4 gap-5'>
        {juz.map((res) => {
          return (
            <button
              key={res.id}
              onClick={() => handleButtonClick(res.id)}
              className='p-4 rounded-md bg-gray-300 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 text-black dark:text-white'
            >
              <h1 className='mb-3 font-bold'>{res.id}</h1>
              <h1 className='flex justify-between'>
                {res.title}
                <p className='font-bold'>{res.arabic}</p>
              </h1>
            </button>
          );
        })}
      </div>
    </div>
  );
}
