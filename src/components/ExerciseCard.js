import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Card, CardMedia, CardContent, Box, Chip } from '@mui/material';

const ExerciseCard = ({ exercise, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <Card 
        component={Link} 
        to={`/exercise/${exercise.id}`} 
        sx={{ 
          display: 'flex', 
          textDecoration: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 3
          }
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 200, height: 150, objectFit: 'cover' }}
          image={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box>
            <Typography 
              variant="h6" 
              component="h3" 
              fontWeight="bold" 
              sx={{ textTransform: 'capitalize', mb: 1 }}
            >
              {exercise.name}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
              <Chip 
                label={exercise.bodyPart} 
                size="small" 
                sx={{ 
                  bgcolor: '#FFA9A9', 
                  color: '#fff',
                  textTransform: 'capitalize'
                }} 
              />
              <Chip 
                label={exercise.target} 
                size="small" 
                sx={{ 
                  bgcolor: '#FCC757', 
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

  // Grid view (default)
  return (
    <Card
      component={Link}
      to={`/exercise/${exercise.id}`}
      className="exercise-card"
      sx={{
        textDecoration: 'none',
        borderTop: '4px solid #FF2625',
        borderRadius: '0 0 20px 20px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="326"
        image={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
          <Chip 
            label={exercise.bodyPart} 
            size="small" 
            sx={{ 
              bgcolor: '#FFA9A9', 
              color: '#fff',
              textTransform: 'capitalize'
            }} 
          />
          <Chip 
            label={exercise.target} 
            size="small" 
            sx={{ 
              bgcolor: '#FCC757', 
              color: '#fff',
              textTransform: 'capitalize'
            }} 
          />
        </Stack>
        <Typography 
          variant="h6" 
          component="h3" 
          fontWeight="bold" 
          sx={{ 
            fontSize: { lg: '20px', xs: '18px' },
            textTransform: 'capitalize',
            color: '#000'
          }}
        >
          {exercise.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 1, textTransform: 'capitalize' }}
        >
          Equipment: {exercise.equipment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;