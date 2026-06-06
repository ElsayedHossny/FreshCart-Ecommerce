import React from 'react'

import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet-async';
import SpecificProducts from '../SpecificProducts/SpecificProducts';
import { Link } from 'react-router-dom';
import BrandSlider from '../BrandSlider/BrandSlider';

export default function Home() {


  return (<>

    <Helmet>
      <title>Home | FreshCart</title>
      <meta name="description" content="Welcome to the home page of My Website." />
    </Helmet>

    <div className="d-flex flex-column gap-3 ">
      <MainSlider />
      <div className="container">
        <CategorySlider />
        <BrandSlider />
      </div>
      <SpecificProducts />
    </div>
  </>
  )
}
