import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const PosterLoader = () => (
  <ContentLoader 
    speed={1}
    width="100%"
    height="100%"
    backgroundColor="#f3f3f3"
    foregroundColor="#FF6C00"
  >
    <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
  </ContentLoader>
)

export default PosterLoader
