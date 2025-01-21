import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { tw } from 'react-native-tailwindcss';

const Schedule = () => {
  // Weekly schedule data
  const weeklySchedule = {
    Monday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ],
    Tuesday: [
      { subject: "Ethics", time: "1:00-2:30 PM", room: "Room 205" }
    ],
    Wednesday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ],
    Thursday: [
      { subject: "Ethics", time: "1:00-2:30 PM", room: "Room 205" }
    ],
    Friday: [
      { subject: "Technopreneurship", time: "9:00-10:30 AM", room: "Room 301" },
      { subject: "Project Management", time: "2:00-3:30 PM", room: "Room 405" }
    ]
  };

  return (
    <View style={[tw.flex1, tw.bgGray100]}>
      {/* Schedule Content */}
      <ScrollView style={[tw.flex1, tw.p4]}>
        {Object.entries(weeklySchedule).map(([day, schedules]) => (
          <View key={day} style={[tw.mB6]}>
            {/* Day Header */}
            <View style={[tw.flexRow, tw.itemsCenter, tw.mB2]}>
              <Text style={[tw.textLg, tw.fontBold, tw.mB2]}>
                {day}
              </Text>
            </View>

            {/* Schedule Cards */}
            {schedules.map((schedule, index) => (
              <View
                key={index}
                style={[
                  tw.p4,
                  tw.roundedLg,
                  tw.mB2,
                  tw.shadow,
                  tw.bgWhite
                ]}
              >
                <Text style={[tw.textLg, tw.fontMedium]}>
                  {schedule.subject}
                </Text>
                <View style={[tw.flexRow, tw.justifyBetween, tw.mT2]}>
                  <Text style={[tw.textSm, tw.textGray600]}>
                    {schedule.time}
                  </Text>
                  <Text style={[tw.textSm, tw.textGray600]}>
                    {schedule.room}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Schedule;