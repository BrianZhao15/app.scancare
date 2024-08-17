import { View, Text, Image } from 'react-native'
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';
import iconSet from '@expo/vector-icons/build/Fontisto';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View>
            <Image
                style={{ flex: 1 }}
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screensOptions={{
                tabBarStyle: {
                    height: 100
                }
            }}>
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
            <Tabs.Screen 
                name="camera"
                options={{ 
                    title: 'Camera',
                    tabBarIcon: ({ color, focused }) => ( 
                        <TabIcon 
                            icon={icons.camera}
                            color={color}
                            name="Camera"
                            focused={focused} /> ) 
                }}
            />
            <Tabs.Screen 
                name="results"
                options={{ 
                    title: 'Results',
                    tabBarIcon: ({ color, focused }) => ( 
                        <TabIcon 
                            icon={icons.search}
                            color={color}
                            name="Results"
                            focused={focused} /> ) 
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout