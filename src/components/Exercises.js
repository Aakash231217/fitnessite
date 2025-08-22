import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  Box, 
  Stack, 
  Typography, 
  Pagination, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  ToggleButton, 
  ToggleButtonGroup,
  Chip,
  Alert,
  Skeleton,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  GridView, 
  ViewList, 
  Refresh 
} from '@mui/icons-material';

import { exerciseOptions, fetchData } from '../utils/fetchData';
import ExerciseCard from './ExerciseCard';
import Loader from './Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage, setExercisesPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [equipmentFilter, setEquipmentFilter] = useState('all');

  // Get unique equipment types
  const equipmentTypes = useMemo(() => {
    const types = [...new Set(exercises.map(ex => ex.equipment))];
    return ['all', ...types.sort()];
  }, [exercises]);

  // Fetch exercises data with error handling
  const fetchExercisesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }

      setExercises(exercisesData);
    } catch (err) {
      setError('Failed to load exercises. Please try again.');
      console.error('Error fetching exercises:', err);
    } finally {
      setLoading(false);
    }
  }, [bodyPart, setExercises]);

  useEffect(() => {
    fetchExercisesData();
  }, [fetchExercisesData]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart, equipmentFilter, sortBy, sortOrder]);

  // Filter and sort exercises
  const filteredAndSortedExercises = useMemo(() => {
    let filtered = exercises;

    // Filter by equipment
    if (equipmentFilter !== 'all') {
      filtered = filtered.filter(ex => ex.equipment === equipmentFilter);
    }

    // Sort exercises
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [exercises, equipmentFilter, sortBy, sortOrder]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredAndSortedExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    
    // Smooth scroll to exercises section
    const exercisesElement = document.getElementById('exercises');
    if (exercisesElement) {
      exercisesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  const handleRetry = () => {
    fetchExercisesData();
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {Array.from(new Array(exercisesPerPage)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" height={326} sx={{ borderRadius: 2 }} />
          <Box sx={{ pt: 2 }}>
            <Skeleton width="60%" />
            <Skeleton width="40%" />
            <Skeleton width="80%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  if (loading && exercises.length === 0) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }} mb="46px">
          Loading Exercises...
        </Typography>
        {renderSkeleton()}
      </Box>
    );
  }

  if (error) {
    return (
      <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
        <Alert 
          severity="error" 
          action={
            <IconButton color="inherit" size="small" onClick={handleRetry}>
              <Refresh />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box id="exercises" sx={{ mt: { lg: '109px' } }} mt="50px" p="20px">
      {/* Header with results count */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ fontSize: { lg: '44px', xs: '30px' } }}>
            Showing Results
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            {filteredAndSortedExercises.length} exercise{filteredAndSortedExercises.length !== 1 ? 's' : ''} found
            {bodyPart !== 'all' && (
              <Chip 
                label={bodyPart} 
                size="small" 
                sx={{ ml: 1, textTransform: 'capitalize' }}
                color="primary"
              />
            )}
          </Typography>
        </Box>
        
        {/* View mode toggle */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
        >
          <ToggleButton value="grid">
            <Tooltip title="Grid View">
              <GridView />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value="list">
            <Tooltip title="List View">
              <ViewList />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Filters and Controls */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap" alignItems="center">
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="bodyPart">Body Part</MenuItem>
            <MenuItem value="target">Target Muscle</MenuItem>
            <MenuItem value="equipment">Equipment</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">A-Z</MenuItem>
            <MenuItem value="desc">Z-A</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Equipment</InputLabel>
          <Select
            value={equipmentFilter}
            label="Equipment"
            onChange={(e) => setEquipmentFilter(e.target.value)}
          >
            {equipmentTypes.map((equipment) => (
              <MenuItem key={equipment} value={equipment}>
                {equipment === 'all' ? 'All Equipment' : equipment.charAt(0).toUpperCase() + equipment.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={exercisesPerPage}
            label="Per Page"
            onChange={(e) => setExercisesPerPage(e.target.value)}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={48}>48</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Exercises Grid/List */}
      {currentExercises.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No exercises found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Try adjusting your filters or search terms
          </Typography>
        </Box>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <Grid container spacing={3} mb={6}>
              {currentExercises.map((exercise, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id || idx}>
                  <ExerciseCard exercise={exercise} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={2} mb={6}>
              {currentExercises.map((exercise, idx) => (
                <ExerciseCard key={exercise.id || idx} exercise={exercise} listView />
              ))}
            </Stack>
          )}

          {/* Pagination */}
          {filteredAndSortedExercises.length > exercisesPerPage && (
            <Stack alignItems="center" spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Showing {indexOfFirstExercise + 1}-{Math.min(indexOfLastExercise, filteredAndSortedExercises.length)} of {filteredAndSortedExercises.length} exercises
              </Typography>
              <Pagination
                color="primary"
                shape="rounded"
                count={Math.ceil(filteredAndSortedExercises.length / exercisesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                size="large"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default Exercises;
