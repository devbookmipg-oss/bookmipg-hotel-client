'use client';

import { Footer, Header } from '@/components/common';
import {
  FeaturedPropertiesCarousel,
  QuickCategoriesGrid,
  SearchBarComponent,
} from '@/components/homePageComp';

const Page = () => {
  return (
    <>
      <Header />
      <SearchBarComponent />

      <QuickCategoriesGrid />
      <FeaturedPropertiesCarousel />
      <Footer />
    </>
  );
};

export default Page;
