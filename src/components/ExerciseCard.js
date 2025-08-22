import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Stack, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addToFavorites, removeFromFavorites, isFavorite } from '../utils/favorites';

const ExerciseCard = ({ exercise, listView = false }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(exercise.id));
  }, [exercise.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(exercise.id);
      setFavorite(false);
    } else {
      addToFavorites(exercise.id);
      setFavorite(true);
    }
  };

  const FavoriteButton = () => (
    <Tooltip title={favorite ? "Remove from favorites" : "Add to favorites"}>
      <IconButton
        onClick={handleFavoriteClick}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }
        }}
        size="small"
      >
        {favorite ? (
          <Favorite sx={{ color: '#FF2625' }} />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>
    </Tooltip>
  );

  if (listView) {
    return (
      <Card 
        component={Link} 
        to={`/exercise/${exercise.id}`}
        sx={{ 
          display: 'flex', 
          textDecoration: 'none',
          position: 'relative',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3
          }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            sx={{ width: 200, height: 150, objectFit: 'cover' }}
            image={exercise.gifUrl}
            alt={exercise.name}
            loading="lazy"
          />
          <FavoriteButton />
        </Box>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" component="h3" fontWeight="bold" textTransform="capitalize" mb={1}>
              {exercise.name}
            </Typography>
            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
              <Chip 
                label={exercise.bodyPart} 
                size="small" 
                sx={{ 
                  backgroundColor: '#FFA9A9', 
                  color: '#fff',
                  textTransform: 'capitalize'
                }} 
              />
              <Chip 
                label={exercise.target} 
                size="small" 
                sx={{ 
                  backgroundColor: '#FCC757', 
                  color: '#fff',
                  textTransform: 'capitalize'
                }} 
              />
              <Chip 
                label={exercise.equipment} 
                size="small" 
                variant="outlined"
                sx={{ textTransform: 'capitalize' }}
              />
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      component={Link} 
      to={`/exercise/${exercise.id}`}
      className="exercise-card"
      sx={{
        textDecoration: 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="260"
          image={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
          sx={{ objectFit: 'cover' }}
        />
        <FavoriteButton />
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" gap={1}>
            <Chip 
              label={exercise.bodyPart} 
              size="small" 
              sx={{ 
                backgroundColor: '#FFA9A9', 
                color: '#fff',
                textTransform: 'capitalize'
              }} 
            />
            <Chip 
              label={exercise.target} 
              size="small" 
              sx={{ 
                backgroundColor: '#FCC757', 
                color: '#fff',
                textTransform: 'capitalize'
              }} 
            />
          </Stack>
          <Typography 
            variant="h6" 
            component="h3" 
            fontWeight="bold" 
            sx={{ fontSize: { lg: '18px', xs: '16px' } }} 
            textTransform="capitalize"
            color="text.primary"
          >
            {exercise.name}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          mt={1}
          textTransform="capitalize"
        >
          Equipment: {exercise.equipment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
