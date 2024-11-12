import React, { useRef, useEffect, Fragment } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import { observer, Observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import TrackPlayer from 'react-native-track-player';

import { img_home } from '../assets';
import { SCREENS } from '../constants';
import { Header, HomeItem, BottomBar, SideMenu } from '../components';
import SoundData from '../sounds';
import { GlobalStore } from '../stores';
import { ScrollView } from 'react-native-gesture-handler';
import { get } from 'mobx';

Icon.loadFont();

const { height, width } = Dimensions.get('window');

export const Home = observer(() => {
  const refBottomTab = useRef();
  const refDrawer = useRef();
  const navi = useNavigation();
  const { position, duration } = TrackPlayer.useTrackPlayerProgress();
  let onTrackChange;

  const showSideMenu = () => {
    if (refDrawer.current) refDrawer.current.openDrawer();
  };

  const renderItem = ({ item, index }) => (
    <>
      {!!!index && (
        <FastImage
          source={img_home}
          resizeMode={FastImage.resizeMode.contain}
          style={styles.image}
        />
      )}
      <HomeItem track={item} />
    </>
  );

  useEffect(() => {
    GlobalStore.setDuration(duration);
    GlobalStore.setPosition(position);
  }, [position, duration]);

  useEffect(() => {
    if (GlobalStore.isShowBottomBar) refBottomTab.current?.fadeInUp();
  }, [GlobalStore.isShowBottomBar]);

  useEffect(() => {
     onTrackChange =  TrackPlayer.addEventListener('playback-track-changed', ({ nextTrack }) => {
      GlobalStore.setCurrentTrack(nextTrack);
    });
    return () => onTrackChange?.remove()
  }, []);

  return (
    <View style={styles.container}>
      <DrawerLayout
        ref={refDrawer}
        drawerWidth={width / 2}
        statusBarAnimation="fade"
        overlayColor="transparent"
        drawerBackgroundColor="transparent"
        drawerType="slide"
        renderNavigationView={() => <SideMenu />}>
        <Header title="Home" leftIcon={{ onPress: showSideMenu }} />

        <View style={styles.content}>
          <FlatList
            data={SoundData}
            extraData={GlobalStore.isPlaying}
            removeClippedSubviews
            disableVirtualization
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          {!!GlobalStore.idSound && (
            <BottomBar
              useNativeDriver
              onPress={() => navi.navigate(SCREENS.DETAIL)}
              ref={refBottomTab}
            />
          )}
        </View>
      </DrawerLayout>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  scrollView: {
    height: height - 60,
  },
  image: {
    width: width,
    height: height / 2.5,
    backgroundColor: 'transparent',
  },
});
