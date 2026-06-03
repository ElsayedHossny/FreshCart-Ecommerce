import React from 'react'

import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet-async';
import SpecificProducts from '../SpecificProducts/SpecificProducts';
import { Link } from 'react-router-dom';

export default function Home() {


  return (<>

    <Helmet>
      <title>Home | FreshCart</title>
      <meta name="description" content="Welcome to the home page of My Website." />
    </Helmet>

    <div className="d-flex flex-column gap-5 ">
      <MainSlider />
      <CategorySlider />
      <SpecificProducts />
      <Link to={"products"} className='text-center mb-2'>
        <button className='btn bg-main text-white px-5 py-2 fw-bolder'>Show More</button>
      </Link>

    </div>
  </>
  )
}
