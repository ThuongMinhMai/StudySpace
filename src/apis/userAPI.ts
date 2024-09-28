import axios from 'axios';
import studySpaceAPI from '../lib/studySpaceAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export interface IUserDetail {
  address: string;
  avatarUrl: string;
  dob: string; // Consider using Date type if you need to manipulate dates
  email: string;
  gender: string;
  isActive: boolean;
  name: string;
  password: string; // You might want to avoid exposing sensitive data like passwords
  phone: string;
  roleName: string;
  wallet: number;
}
// export const fetchUserDetail = async (userId: string): Promise<IUserDetail> => {
//   const { data } = await busAPI.get<IUserDetail>(`/user-management/managed-users/${userId}/details`);
//   return data;
// };
export const fetchUserDetail = (userId: string) => {
    return useQuery({
      queryKey: ['userDetail', userId],
      queryFn: async () => {
       const response = await studySpaceAPI.get<{ data: IUserDetail }>(`/Accounts/detail/${userId}`);
        return response.data.data; // Extracting the user detail from the nested structure
      },
      enabled: !!userId,
    });
  };
  export const updateUserProfile = async (userId:string,formData: any) => {
    try {
      const response = await studySpaceAPI.put(`/user-management/managed-users/${userId}`, formData); // Adjust the API endpoint and method as per your backend API
      return response.data; // Assuming the API returns updated user data
    } catch (error) {
      throw new Error('Error updating user profile'); // Handle errors appropriately in your application
    }
  };