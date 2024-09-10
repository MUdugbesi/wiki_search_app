import { useState } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import Input from './components/Input';
import ResultCard from './containers/ResultCard';

const App = () => {
  const [click, setClick] = useState(false);
  const [searchVal, setSearchVal] = useState('Lamborghini');
  const [searchResult, setSearchResult] = useState(null);

  const handleViewClick = () => {
    setClick(!click);
  };
  const handleChange = ({ target }) => {
    setSearchVal(target.value);
  };
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchVal}`;

  const options = {
    method: 'GET',
  };

  const fetchData = async () => {
    try {
      const data = await fetch(url, options);
      const response = await data.json();
      if (response) {
        setSearchResult(response.query.search);
      } else {
        setSearchResult(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData();
      setClick(!click);
    }
  };

  const handleReset = () => {
    setSearchResult(null);
  };

  return (
    <main className='min-w-screen min-h-screen bg-blue-900 flex justify-evenly items-center flex-col pb-8'>
      <div className='w-[300px] h-[300px] flex justify-center items-center flex-col transition-all delay-75 duration-200 ease-linear'>
        <p className='small-text'>Click here for a random article</p>
        <div className='h-[80px] flex justify-center items-center'>
          <div
            className={`transition-all duration-300 ease-linear ${
              !click ? 'opacity-100 scale-105' : 'opacity-100 scale-95'
            }`}
          >
            {!click ? (
              <RiSearchLine
                fontSize={60}
                className='icon hover:translate-y-1 hover:opacity-80 transition-all delay-50 duration-100 ease-linear'
                onClick={handleViewClick}
              />
            ) : (
              <div className='flex items-center justify-center relative'>
                <Input
                  className='input w-full'
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <RiCloseLine
                  size={20}
                  className='icon absolute right-0 mr-3 hover:text-[#a38282] active:text-[black] transition-all delay-50 duration-100 ease-linear'
                  onClick={handleViewClick}
                />
              </div>
            )}
          </div>
        </div>
        <p className='small-text italic'>Click icon to search</p>
      </div>
      {searchResult ? (
        <>
          <p className='text-indigo-400 font-bold text-sm mb-4'>
            Search Result For - {searchVal}
          </p>
          <div className='w-full mx-auto'>
            {searchResult.length ? (
              searchResult.map((result, i) => (
                <div key={i} className='w-full'>
                  <ResultCard item={result} />
                </div>
              ))
            ) : (
              <p className='text-center font-poppins text-3xl text-white font-[700]'>
                Oops! No Result Found
              </p>
            )}
          </div>
        </>
      ) : (
        ''
      )}
      {searchResult ? (
        <button className='mb-8 mt-4 text-white w-[70px]' onClick={handleReset}>
          Clear
        </button>
      ) : (
        ''
      )}
    </main>
  );
};

export default App;
