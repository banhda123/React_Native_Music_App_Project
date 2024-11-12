import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import moment from 'moment';
import FastImage from 'react-native-fast-image';
import { iOSUIKit } from 'react-native-typography';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

import { observer } from 'mobx-react';
import { GlobalStore } from '../stores';
import { Header } from '../components';

const { width, height } = Dimensions.get('window');

const momentDurationFormatSetup = require('moment-duration-format');
momentDurationFormatSetup(moment);

export const Detail = observer(() => {
  const navi = useNavigation();

  const formatTime = (mili) =>
    moment.duration(mili, 'seconds').format('mm:ss', {
      trim: false,
    });

  useEffect(() => {
    //start()
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={GlobalStore._currentSound?.title}
        leftIcon={{
          name: 'ios-chevron-down-sharp',
          onPress: () => navi.goBack(),
        }}
      />
      <View style={styles.content}>
        <View style={styles.content_logo}>
          {Platform.OS == 'ios' ? (
            <Animatable.View
              animation="rotate"
              iterationCount="infinite"
              useNativeDriver
              duration={20000}>
              <FastImage
                style={styles.logo}
                source={{ uri: GlobalStore._currentSound?.artwork }}
              />
            </Animatable.View>
          ) : (
            <FastImage
              style={styles.logo}
              source={{ uri: GlobalStore._currentSound?.artwork }}
            />
          )}
        </View>
        <View style={styles.content_detail}>
          <Text style={iOSUIKit.title3}>
            {formatTime(GlobalStore.position)} /{' '}
            {formatTime(GlobalStore.duration)}
          </Text>
          <Text />
          <Text style={iOSUIKit.title3}>
            {GlobalStore._currentSound?.artist}
          </Text>
        </View>
      </View>
      <View style={styles.content_player}>
        <TouchableOpacity
          onPress={() => GlobalStore.prev()}
          style={styles.button_left}>
          <Icon name="ios-play-back" color="black" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            GlobalStore.isPlaying
              ? GlobalStore.pause()
              : GlobalStore.play(GlobalStore._currentSound?.id)
          }
          style={styles.button_center}>
          <Icon
            name={GlobalStore.isPlaying ? 'ios-pause' : 'ios-play'}
            color="black"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => GlobalStore.next()}
          style={styles.button_right}>
          <Icon name="ios-play-forward" color="black" size={30} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content_logo: {
    height: width - 40,
    width: width - 40,
    borderRadius: (width - 40) / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  logo: {
    height: width - 60,
    width: width - 60,
    borderRadius: (width - 60) / 2,
  },
  content_detail: {
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content_player: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
  },
  button_left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  button_right: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  button_center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
