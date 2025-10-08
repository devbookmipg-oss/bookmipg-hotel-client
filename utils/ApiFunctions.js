import { BASEURL, fetcher } from '@/config/MainApi';
import useSWR from 'swr';
import axios from 'axios';

// fetch data list
export const GetDataList = ({ endPoint }) => {
  const { data } = useSWR(
    `${BASEURL}/${endPoint}?sort=createdAt:desc&populate=*`,
    fetcher,
    {
      refreshInterval: 500,
      revalidateOnFocus: true,
    }
  );
  return data;
};

// get single data
export const GetSingleData = ({ endPoint, id }) => {
  const { data } = useSWR(`${BASEURL}/${endPoint}/${id}?populate=*`, fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: true,
  });
  return data;
};

// create new data
export const CreateNewData = async ({ endPoint, payload }) => {
  const res = await axios.post(`${BASEURL}/${endPoint}`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};

// create update data
export const UpdateData = async ({ endPoint, id, payload }) => {
  const res = await axios.put(`${BASEURL}/${endPoint}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};

// delete data
export const DeleteData = async ({ endPoint, id }) => {
  const res = await axios.delete(`${BASEURL}/${endPoint}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });
  return res;
};

export const GetUserList = () => {
  const { data } = useSWR(`${BASEURL}/online-users?populate=*`, fetcher);
  return data;
};
