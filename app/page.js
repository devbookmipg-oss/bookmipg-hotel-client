'use client';

import { Footer, Header } from '@/components/common';
import {
  FeaturedPropertiesCarousel,
  QuickCategoriesGrid,
  SearchBarComponent,
} from '@/components/homePageComp';
import { GetDataList } from '@/utils/ApiFunctions';
import { Box } from '@mui/material';

const Page = () => {
  const locations = GetDataList({
    endPoint: 'locations',
  });

  const hotels = GetDataList({
    endPoint: 'hotels',
  });
  return (
    <>
      <Header />
      <SearchBarComponent locations={locations} />
      <QuickCategoriesGrid />
      <FeaturedPropertiesCarousel hotels={hotels} />
      <Footer />
    </>
  );
};

export default Page;
