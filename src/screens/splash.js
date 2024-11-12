import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import ProgressBar from 'react-native-progress/Bar';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { observer } from 'mobx-react';

import { gif_headPhone } from '../assets';
import { GlobalStore } from '../stores';
import { SCREENS } from '../constants';

export const Splash = observer(() => {
  const navi = useNavigation();

  const setUpPlayer = () => {
    GlobalStore.load();
  };

  useEffect(() => {
    setUpPlayer();
  }, []);

  useEffect(() => {
    if (GlobalStore.progress == 1)
      navi.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: SCREENS.HOME }] }),
      );
  }, [GlobalStore.progress]);

  return (
    <View style={styles.container}>
      <FastImage
        source={gif_headPhone}
        resizeMode={FastImage.resizeMode.contain}
        style={{ flex: 4 }}
      />
      <View style={{ flex: 1, padding: 20 }}>
        <ProgressBar
          progress={GlobalStore.progress}
          width={null}
          useNativeDriver
          color="pink"
          height={10}
          borderWidth={2}
          borderRadius={5}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
