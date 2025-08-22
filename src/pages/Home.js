import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box>
      <HeroBanner />
      <SearchExercises 
        setExercises={setExercises} 
        bodyPart={bodyPart} 
        setBodyPart={setBodyPart}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Exercises 
        setExercises={setExercises} 
        exercises={exercises} 
        bodyPart={bodyPart}
        searchTerm={searchTerm}
      />
    </Box>
  );
};

export default Home;