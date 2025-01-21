import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { tw } from 'react-native-tailwindcss';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const router = useRouter();

  // Sample student data - replace with actual data from your backend/storage
  const studentData = {
    name: "John Doe",
    studentId: "2021-00123",
    program: "Bachelor of Science in Information Technology",
    yearLevel: "3rd Year",
    section: "IT-3A",
    email: "john.doe@student.edu",
    contact: "+63 912 345 6789",
    address: "123 Student Street, University District"
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              // Clear authentication data
              await AsyncStorage.multiRemove(['isAuthenticated', 'userRole']);
              // Navigate to login screen using the correct path
              router.replace('/login');
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const InfoRow = ({ label, value }) => (
    <View style={[tw.mB4]}>
      <Text style={[tw.textSm, tw.textGray600, tw.mB1]}>{label}</Text>
      <Text style={[tw.textBase, tw.fontMedium]}>{value}</Text>
    </View>
  );

  return (
    <View style={[tw.flex1, tw.bgGray100]}>
      {/* Profile Information */}
      <View style={[tw.flex1, tw.p6, tw.bgWhite, tw.mT4, tw.mX4, tw.roundedLg, tw.shadowMd]}>
        <Text style={[tw.textLg, tw.fontBold, tw.mB4]}>Student Information</Text>
        
        <InfoRow label="Program" value={studentData.program} />
        <InfoRow label="Year Level" value={studentData.yearLevel} />
        <InfoRow label="Section" value={studentData.section} />
        <InfoRow label="Email" value={studentData.email} />
        <InfoRow label="Contact Number" value={studentData.contact} />
        <InfoRow label="Address" value={studentData.address} />

        {/* Logout Button */}
        <TouchableOpacity
          style={[
            tw.mT6,
            tw.p4,
            tw.roundedLg,
            tw.bgRed500,
            tw.wFull,
            tw.itemsCenter
          ]}
          onPress={handleLogout}
        >
          <Text style={[tw.textBase, tw.fontBold, tw.textWhite]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;