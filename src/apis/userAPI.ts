import axios from 'axios';
import studySpaceAPI from '../lib/studySpaceAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export interface IUserDetail {
  id:string
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
 

  export const updateUserProfile = async (userId: string, formData: any) => {
    try {
      const response = await studySpaceAPI.put(`/Accounts/${userId}`, formData);
      
      // Check if response data is null
      if (response.data.data == null) {
        toast.error(response.data.message); // Display error message if no data returned
      } else {
        toast.success('User profile updated successfully!'); // Display success message if data is returned
      }
      
      return response.data; // Always return the response data regardless
    } catch (error) {
      toast.error('Error updating user profile'); // Handle errors appropriately in your application
      throw error; // Optional: Re-throw the error for further handling
    }
  };