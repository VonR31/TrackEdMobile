import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '@/components/TabBar';


const TabLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
        <Tabs.Screen name="schedule" options={{ tabBarLabel: 'Schedule' }} />
        <Tabs.Screen name="index" options={{ tabBarLabel: 'Home' }} />
        <Tabs.Screen name="profile" options={{ tabBarLabel: 'Profile' }} />
    </Tabs>
  )
}

export default TabLayout