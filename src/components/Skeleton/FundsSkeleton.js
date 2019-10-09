import React from 'react';
import ContentLoader from 'react-content-loader';

const FundsSkeleton = () => (
  <ContentLoader height={800} width={375} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="10" y="20" rx="5" ry="5" width="355" height="150" />
    <rect x="10" y="203" rx="0" ry="0" width="84" height="15" />
    <rect x="119" y="199" rx="0" ry="0" width="225" height="15" />
    <rect x="10" y="266" rx="0" ry="0" width="355" height="69" />
    <rect x="120" y="230" rx="0" ry="0" width="59" height="15" />
    <rect x="10" y="231" rx="0" ry="0" width="33" height="15" />
    <rect x="120" y="230" rx="0" ry="0" width="59" height="15" />
    <rect x="10" y="231" rx="0" ry="0" width="33" height="15" />
    <rect x="120" y="368" rx="0" ry="0" width="225" height="15" />
    <rect x="10" y="368" rx="0" ry="0" width="84" height="15" />
    <rect x="10" y="399" rx="0" ry="0" width="31" height="15" />
    <rect x="120" y="394" rx="0" ry="0" width="59" height="15" />
    <rect x="10" y="436" rx="0" ry="0" width="355" height="69" />
    <rect x="10" y="537" rx="0" ry="0" width="84" height="15" />
    <rect x="120" y="529" rx="0" ry="0" width="225" height="15" />
    <rect x="10" y="578" rx="0" ry="0" width="31" height="15" />
    <rect x="120" y="572" rx="0" ry="0" width="59" height="15" />
    <rect x="10" y="619" rx="0" ry="0" width="355" height="69" />
  </ContentLoader>
);

export default FundsSkeleton;
