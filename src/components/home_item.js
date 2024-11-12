import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';

import { GlobalStore } from '../stores';

Icon.loadFont();

export const HomeItem = observer((props) => {
  const { track, leftIcon, rightIcon } = props;

  const onPress = async () => {
    track?.id == GlobalStore._currentSound?.id && GlobalStore.isPlaying
      ? await GlobalStore.pause()
      : await GlobalStore.play(track?.id);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.button}>
        <View style={styles.content_logo}>
          <FastImage
            style={styles.logo}
            source={{
              uri: track?.artwork || '',
            }}
          />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={iOSUIKit.bodyObject}>{track?.title || ''}</Text>
        <Text style={iOSUIKit.subhead}>{track?.artist || ''}</Text>
      </View>
      <View style={styles.button}>
        <Icon
          name={
            track?.id == GlobalStore._currentSound?.id && GlobalStore.isPlaying
              ? 'ios-pause'
              : 'ios-play'
          }
          size={30}
          color="black"
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  content_logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
});
