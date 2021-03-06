import React from 'react';
import axios from 'axios';

const DogLists = ({ dogs, setDogs, setDogList }) => {
  const handleVotes = async (dog) => {
    const value = dog.value === 1 ? 0 : 1;
    dog.value = value;
    const data = {
      image_id: dog.id,
      sub_id: 'my-user-1234',
      value,
    };
    let newDog;
    try {
      if (value === 0) {
        console.log(dog.votes_id);
        const response = await axios.delete(
          `http://localhost:5000/api/dogs/vote/${dog.votes_id}`
        );
        console.log(response);
        delete dog.votes_id;
        newDog = dog;
      } else {
        const response = await axios.post(
          'http://localhost:5000/api/dogs/vote',
          data
        );
        newDog = { ...dog, votes_id: response.data.id };
      }
      const filterProps = dogs.filter((prop) => prop.id !== dog.id);
      const newData = [newDog, ...filterProps];
      setDogs(newData);
      setDogList(newData);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {dogs.map((dog, index) => (
        <div key={index}>
          <a
            className="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
            href="#"
          >
            <img className="h-40 w-40" src={dog.url} alt={dog.id} />
            {dog.breeds.length > 0 ? (
              <h2 className="uppercase text-2xl">{dog.name}</h2>
            ) : (
              <h2 className="uppercase text-2xl">No Name</h2>
            )}
            <button
              className="bg-gray-300 hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center mt-4"
              onClick={() => handleVotes(dog)}
            >
              {dog.value > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
              <span>{dog.value > 0 ? 'Unvote' : 'Vote'}</span>
            </button>
          </a>
        </div>
      ))}
    </>
  );
};

export default DogLists;
