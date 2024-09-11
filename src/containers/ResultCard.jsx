import parse from 'html-react-parser';

const ResultCard = ({ item }) => {
  const pasrseItem = parse(item.snippet);
  const url = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);

  return (
    <>
      <div className='card'>
        <div className='flex flex-col'>
          <h1 className='text-[16px] font-bold mb-[6px] uppercase'>
            {item.title}
          </h1>
          <p className='italic text-sm mb-3'>{pasrseItem}</p>
        </div>
        <div className='flex justify-end'>
          <button className='shadow-black shadow-sm hover:shadow-white hover:shadow-md'>
            <a href={url}>View Article</a>
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultCard;
