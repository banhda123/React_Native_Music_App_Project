import { types, cast, flow } from 'mobx-state-tree';
import TrackPlayer from 'react-native-track-player';
import SoundData from '../sounds';

export const GlobalStore = types
  .model('Global', {
    progress: types.number,
    idSound: types.string,
    isPlaying: types.boolean,
    isShowBottomBar: types.boolean,
    position: types.number,
    duration: types.number,
  })
  .views((self) => ({
    get _currentSound() {
      if (!self.idSound) return null;
      return SoundData.find((i) => i.id == self.idSound);
    },
  }))
  .actions((self) => ({
    load: flow(function* () {
      if (self.idSound) {
        self.progress = 1;
        return;
      }
      self.progress = 0.5;
      try {
        yield TrackPlayer.setupPlayer();
        yield TrackPlayer.add(SoundData);
        self.progress = 1;
      } catch (error) {
        console.log('ERROR LOAD TRACK PLAYER', error);
      }
    }),

    play: flow(function* (id) {
      try {
        if (id == self.idSound) {
          yield TrackPlayer.play();
          self.isPlaying = true;
          return;
        }
        self.idSound = id;
        self.position = 0;
        yield TrackPlayer.skip(id);
        yield TrackPlayer.play();
        self.duration = yield TrackPlayer.getDuration();
        self.isPlaying = true;
        self.isShowBottomBar = true;
      } catch (error) {
        console.log('ERROR PLAY TRACK PLAYER', error);
      }
    }),

    pause: flow(function* () {
      try {
        yield TrackPlayer.pause();
        self.isPlaying = false;
      } catch (error) {
        console.log('ERROR PAUSE TRACK PLAYER', error);
      }
    }),

    next: flow(function* () {
      try {
        if (self.idSound == SoundData[SoundData.length - 1].id) {
          yield TrackPlayer.skip(SoundData[0].id);
          yield TrackPlayer.play();
        } else yield TrackPlayer.skipToNext();

        self.idSound = yield TrackPlayer.getCurrentTrack();
        self.isPlaying = true;
      } catch (error) {
        console.log('ERROR NEXT TRACK PLAYER', error);
      }
    }),

    prev: flow(function* () {
      try {
        if (self.idSound == SoundData[0].id) {
          yield TrackPlayer.skip(SoundData[SoundData.length - 1].id);
          yield TrackPlayer.play();
        } else yield TrackPlayer.skipToPrevious();

        self.idSound = yield TrackPlayer.getCurrentTrack();
        self.isPlaying = true;
      } catch (error) {
        console.log('ERROR PREV TRACK PLAYER', error);
      }
    }),
    setPosition(val) {
      self.position = val;
    },
    setDuration(val) {
      self.duration = val;
    },
    setCurrentTrack: flow(function* (id) {
      self.idSound = id;
      try {
        self.duration = yield TrackPlayer.getDuration();
        self.position = 0;
      } catch (error) {
        console.log('ERROR SET DURATION TRACK PLAYER', error);
      }
    }),
  }))
  .create({
    idSound: '',
    progress: 0,
    isPlaying: false,
    isShowBottomBar: false,
    position: 0,
    duration: 0,
  });
