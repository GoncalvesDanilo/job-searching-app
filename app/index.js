import { useState } from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { NearbyJobs, PopularJobs, Welcome, ScreenHeaderBtn } from '../components';

import { COLORS, icons, images, SIZES } from '../constants';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <StatusBar barStyle="dark-content" />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimentions="60%" />,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimentions="100%" />
          ),
          headerTitle: '',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) router.push(`/search/${searchTerm}`);
            }}
          />
          <PopularJobs />
          <NearbyJobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
