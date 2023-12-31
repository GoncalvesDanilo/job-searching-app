import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';
import { Text, SafeAreaView } from 'react-native';
import useFetch from '../../hooks/useFetch';

import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
import styles from '../../styles/search';

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  let apiQuery = {
    query: params.searchTerm,
    page: '1',
  };
  const { data, isLoading, error, refetch } = useFetch('search', apiQuery);

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      refetch({
        ...apiQuery,
        page: prevPage.toString(),
      });
    } else if (direction === 'right') {
      const nextPage = page + 1;
      setPage(nextPage);
      refetch({
        ...apiQuery,
        page: nextPage.toString(),
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimentions="60%"
              handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NearbyJobCard
            job={item}
            handleNavigate={() => router.push(`/job-details/${item.job_id}`)}
          />
        )}
        keyExtractor={(item) => item.job_id}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{params.id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                error && <Text>Oops something went wrong</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('left')}
            >
              <Image
                source={icons.chevronLeft}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => handlePagination('right')}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default JobSearch;
