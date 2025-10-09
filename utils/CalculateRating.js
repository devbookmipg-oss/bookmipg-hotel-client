export const calculateReviewStats = (reviews = []) => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
    };
  }

  // ✅ Sum all valid stars (handle both 'star' and 'stars')
  const totalStars = reviews.reduce((sum, review) => {
    const stars = Number(review.stars ?? review.star ?? 0);
    return sum + (isNaN(stars) ? 0 : stars);
  }, 0);

  // ✅ Calculate average and round down (e.g. 4.9 → 4)
  const averageRating = Math.floor(totalStars / totalReviews);

  return {
    totalReviews,
    averageRating,
  };
};
