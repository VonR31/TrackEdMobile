import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tw } from 'react-native-tailwindcss';

const Page = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Sample student data
  const studentSubjects = [
    {
      name: "Technopreneurship",
      code: "TechnoPre",
      schedule: "MWF 9:00-10:30 AM",
      instructor: "Ms. Lopez",
      room: "Room 301",
      attendance: {
        present: 24,
        late: 3,
        absent: 1,
        total: 28
      },
      grades: {
        midterm: null,
        finals: null    
      }
    },
    {
      name: "Ethics",
      code: "GE108",
      schedule: "TTH 1:00-2:30 PM",
      instructor: "Dr. Ople",
      room: "Room 205",
      attendance: {
        present: 26,
        late: 2,
        absent: 0,
        total: 28
      },
      grades: {
        midterm: null,
        finals: null       
      }
    },
    {
      name: "Project Management",
      code: "ITElectv3",
      schedule: "MWF 2:00-3:30 PM",
      instructor: "Ms. Libunao",
      room: "Room 405",
      attendance: {
        present: 25,
        late: 2,
        absent: 1,
        total: 28
      },
      grades: {
        midterm: null,
        finals: null
      }
    }
  ];

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      setDarkMode(savedTheme === 'dark');
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem('theme', !darkMode ? 'dark' : 'light');
      setDarkMode(!darkMode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const SubjectCard = ({ subject }) => (
    <TouchableOpacity
      style={[
        tw.p4,
        tw.roundedLg,
        tw.mB4,
        darkMode ? tw.bgGray800 : tw.bgWhite,
        tw.shadow
      ]}
      onPress={() => setSelectedSubject(subject)}
    >
      <Text style={[tw.textLg, tw.fontBold, darkMode ? tw.textWhite : tw.textBlack]}>
        {subject.name}
      </Text>
      <Text style={[tw.textSm, tw.mT2, darkMode ? tw.textGray300 : tw.textGray600]}>
        Instructor: {subject.instructor}
      </Text>
      <Text style={[tw.textSm, darkMode ? tw.textGray300 : tw.textGray600]}>
        Schedule: {subject.schedule}
      </Text>
      <Text style={[tw.textSm, darkMode ? tw.textGray300 : tw.textGray600]}>
        Room: {subject.room}
      </Text>
      <View style={[tw.flexRow, tw.justifyBetween, tw.itemsCenter, tw.mT2]}>
        <Text style={[tw.textSm, darkMode ? tw.textGray300 : tw.textGray600]}>
          Attendance:
        </Text>
        <Text style={[tw.fontBold, darkMode ? tw.textWhite : tw.textBlack]}>
          {((subject.attendance.present / subject.attendance.total) * 100).toFixed(1)}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSubjectDetails = () => {
    if (!selectedSubject) return null;

    const attendancePercentage = (selectedSubject.attendance.present / selectedSubject.attendance.total) * 100;

    return (
      <ScrollView style={[tw.p4]}>
        <View style={[tw.mB4]}>
          <View style={[tw.flexRow, tw.justifyBetween, tw.itemsCenter]}>
            <Text style={[tw.textXl, tw.fontBold, darkMode ? tw.textWhite : tw.textBlack]}>
              {selectedSubject.name}
            </Text>
            <TouchableOpacity
              style={[tw.p2, tw.roundedLg, darkMode ? tw.bgGray700 : tw.bgGray200]}
              onPress={() => setSelectedSubject(null)}
            >
              <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Attendance Card */}
          <View style={[tw.mT4, tw.p4, tw.roundedLg, darkMode ? tw.bgGray700 : tw.bgGray100]}>
            <Text style={[tw.textLg, tw.fontBold, tw.mB4, darkMode ? tw.textWhite : tw.textBlack]}>
              Attendance Summary
            </Text>
            <View style={[tw.flexRow, tw.justifyBetween, tw.mB4]}>
              <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>Attendance Rate:</Text>
              <Text style={[tw.fontBold, darkMode ? tw.textWhite : tw.textBlack]}>
                {attendancePercentage.toFixed(1)}%
              </Text>
            </View>
            <View style={[tw.flexRow, tw.justifyBetween]}>
              <View style={[tw.p2, tw.roundedLg, tw.bgGreen200, tw.flex1, tw.mR2]}>
                <Text style={[tw.textCenter, tw.fontBold]}>{selectedSubject.attendance.present}</Text>
                <Text style={[tw.textCenter, tw.textSm]}>Present</Text>
              </View>
              <View style={[tw.p2, tw.roundedLg, tw.bgYellow200, tw.flex1, tw.mR2]}>
                <Text style={[tw.textCenter, tw.fontBold]}>{selectedSubject.attendance.late}</Text>
                <Text style={[tw.textCenter, tw.textSm]}>Late</Text>
              </View>
              <View style={[tw.p2, tw.roundedLg, tw.bgRed200, tw.flex1]}>
                <Text style={[tw.textCenter, tw.fontBold]}>{selectedSubject.attendance.absent}</Text>
                <Text style={[tw.textCenter, tw.textSm]}>Absent</Text>
              </View>
            </View>
          </View>

          {/* Grades Card */}
          <View style={[tw.mT4, tw.p4, tw.roundedLg, darkMode ? tw.bgGray700 : tw.bgGray100]}>
            <Text style={[tw.textLg, tw.fontBold, tw.mB4, darkMode ? tw.textWhite : tw.textBlack]}>
              Grade Summary
            </Text>
            <View style={[tw.spaceY2]}>
              <View style={[tw.flexRow, tw.justifyBetween]}>
                <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>Midterm:</Text>
                <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>
                  {selectedSubject.grades.midterm || 'N/A'}
                </Text>
              </View>
              <View style={[tw.flexRow, tw.justifyBetween]}>
                <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>Finals:</Text>
                <Text style={[darkMode ? tw.textWhite : tw.textBlack]}>
                  {selectedSubject.grades.finals || 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={[tw.flex1, tw.bgGray100]}>
      {/* Main Content */}
      <ScrollView style={[tw.flex1, tw.p4]}>
        {selectedSubject ? (
          renderSubjectDetails()
        ) : (
          studentSubjects.map((subject) => (
            <SubjectCard key={subject.code} subject={subject} />
          ))
        )}
      </ScrollView>
    </View>
  );
}
export default Page;