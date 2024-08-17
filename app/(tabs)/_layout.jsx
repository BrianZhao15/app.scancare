import { View, Text, Image } from 'react-native'
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';
import iconSet from '@expo/vector-icons/build/Fontisto';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View>
            <Image 
                source={icon}
            
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs>
            <Tabs.Screen 
                name="home"
                options={{ 
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => ( 
                        <TabIcon 
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused} /> ) 
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout