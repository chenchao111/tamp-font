import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSkeleton = () => (
  <ContentLoader height={800} width={375} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="10" y="20" rx="5" ry="5" width="355" height="150" />
    <rect x="10" y="220" rx="5" ry="5" width="355" height="150" />
    <rect x="10" y="420" rx="5" ry="5" width="355" height="150" />
  </ContentLoader>
);

export default CardSkeleton;
