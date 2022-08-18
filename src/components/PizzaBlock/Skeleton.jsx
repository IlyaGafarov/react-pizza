import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="128" cy="112" r="112" />
    <rect x="7" y="244" rx="10" ry="10" width="244" height="27" />
    <rect x="8" y="391" rx="5" ry="5" width="81" height="28" />
    <rect x="132" y="383" rx="15" ry="15" width="117" height="37" />
    <rect x="7" y="286" rx="10" ry="10" width="241" height="82" />
  </ContentLoader>
)

export default Skeleton
