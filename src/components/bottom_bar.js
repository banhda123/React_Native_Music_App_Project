import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';
import { observer } from 'mobx-react';
import { GlobalStore } from '../stores';

Icon.loadFont();

const { height, width } = Dimensions.get('window');

class _BottomBar extends React.Component {
  render() {
    const track = GlobalStore._currentSound;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container_logo}
          onPress={() => this.props.onPress()}>
          {Platform.OS == 'ios' ? (
            <Animatable.View
              animation="rotate"
              useNativeDriver
              iterationCount="infinite"
              duration={10000}>
              <View style={styles.content_logo}>
                <FastImage
                  style={styles.logo}
                  source={{ uri: track?.artwork }}
                />
              </View>
            </Animatable.View>
          ) : (
            <View style={styles.content_logo}>
              <FastImage style={styles.logo} source={{ uri: track?.artwork }} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.container_player}>
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
      </View>
    );
  }
}

_BottomBar.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 60,
    width: width * 0.95,
    // position: 'absolute',
    bottom: 0,
    padding: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 0,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  container_logo: {
    flex: 3,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  container_player: {
    flex: 7,
    backgroundColor: 'transparent',
  },
  content_logo: {
    margin: -30,
    height: 80,
    width: 80,
    borderRadius: 40,
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
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  content_text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content_player: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

export const BottomBar = Animatable.createAnimatableComponent(
  observer(_BottomBar),
);
