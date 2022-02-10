import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DogLists from './components/DogLists';
import SearchBox from './components/SearchBox';

const App = () => {
  const [dogs, setDogs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dogList, setDogList] = useState('');

  const getDogsRequest = async () => {
    const url = 'http://localhost:5000/api/dogs';
    const response = await axios.get(`${url}?limit=12&page=1&order=DESC`);
    const data = await response.data;
    setDogs(data);
  };
  const handleSearch = (inputValue) => {
    setSearchValue(inputValue);

    if (inputValue !== '') {
      const newDogsList = dogs.filter((dog) => {
        return Object.values(dog)
          .join(' ')
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      });
      setDogList(newDogsList);
    } else {
      setDogList(dogs);
    }
  };

  useEffect(() => {
    getDogsRequest();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-8 uppercase">DOG APP</h1>
      <SearchBox searchValue={searchValue} handleSearch={handleSearch} />
      <div className="py-4 grid gap-4 md:grid-cols-3 grid-cols-1">
        <DogLists
          dogs={searchValue.length < 1 ? dogs : dogList}
          setDogs={setDogs}
          setDogList={setDogList}
        />
      </div>
    </div>
  );
};

export default App;
