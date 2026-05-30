import React from 'react'

import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {


  return (<>
    <div className=" d-flex  flex-column gap-5">
      <MainSlider />
      <CategorySlider />
      <FeatureProducts />
    </div>
  </>
  )
}
