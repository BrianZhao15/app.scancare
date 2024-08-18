import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'

const Home = () => {
  return (
    <SafeAreaView>
        <FlatList 
            data={[{ id: 1 }, { id: 2 }, { id: 3 }]} 
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <Text className="text-3xl">{item.id}</Text>}
            ListHeaderComponent={() => (
                <View className="my-6 px-4 space-y-6">
                    <View className="justify-between items-start flex-row mb-6">
                        <View>
                            <Text className="text-2xl font-psemibold">
                                Welcome!
                            </Text>
                        </View>

                        <View className="mt-0">
                            <Image 
                                source={images.logo}
                                className="w-20 h-20"
                            />
                        </View>
                    </View>

                </View>
            )}
            />

    </SafeAreaView>
  )
}

export default Home