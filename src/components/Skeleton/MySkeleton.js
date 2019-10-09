import React from 'react';
import ContentLoader from 'react-content-loader';

const MySkeleton = () => (
  <ContentLoader height={800} width={375} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <circle cx="50" cy="30" r="30" />
    <rect x="90" y="26" rx="4" ry="4" width="100" height="13" />
    <rect x="248" y="27" rx="4" ry="4" width="50" height="8" />
    <rect x="320" y="27" rx="4" ry="4" width="20" height="8" />
    <rect x="10" y="71" rx="5" ry="5" width="355" height="180" />
    <rect x="10" y="280" rx="0" ry="0" width="60" height="60" />
    <rect x="105" y="280" rx="0" ry="0" width="60" height="60" />
    <rect x="205" y="280" rx="0" ry="0" width="60" height="60" />
    <rect x="300" y="280" rx="0" ry="0" width="60" height="60" />
    <rect x="10" y="365" rx="5" ry="5" width="355" height="50" />
    <rect x="10" y="438" rx="5" ry="5" width="355" height="50" />
    <rect x="9" y="509" rx="5" ry="5" width="355" height="50" />
    <rect x="7" y="578" rx="5" ry="5" width="355" height="50" />
    <rect x="7" y="651" rx="5" ry="5" width="355" height="50" />
    <rect x="6" y="721" rx="5" ry="5" width="355" height="50" />
  </ContentLoader>
);

export default MySkeleton;
