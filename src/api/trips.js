import { authApi, publicApi } from './http';

export const tripKeys = {
  all: ['trips'],
  byTheme: (theme) => [...tripKeys.all, 'theme', theme || 'all'],
  byCuratedCategory: (category) => [...tripKeys.all, 'curated', category || 'all'],
  search: (destination) => [...tripKeys.all, 'search', destination || ''],
  detail: (tripId) => [...tripKeys.all, 'detail', tripId],
};

export const getTripsByTheme = async (theme = 'all') => {
  const result = await publicApi(
    `/api/user/filter/get-trips-by-theme/${encodeURIComponent(theme)}`
  );

  return result.data || [];
};

export const getTripsByCuratedCategory = async (category = 'all') => {
  const result = await publicApi(
    `/api/user/filter/get-trips-by-curated/${encodeURIComponent(category)}`
  );

  return result.data || [];
};

export const getHomepageTrips = async () => {
  const result = await publicApi('/api/user/filter/homepage');

  return result.data || {
    curated: [],
    trending: [],
    deals: [],
    hiddenGems: [],
  };
};

export const searchTrips = async (destination) => {
  const result = await publicApi(
    `/api/user/filter/filter-trips?destination=${encodeURIComponent(destination)}`
  );

  return result.data || [];
};

export const getTripDetails = async (tripId) => {
  const result = await publicApi(`/api/trips/get-trip-details/${tripId}`);

  return result.data || null;
};

export const bookTrip = async (bookingData) => {
  return authApi('/api/user/trip/book-trip', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};
