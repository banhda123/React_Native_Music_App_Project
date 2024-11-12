import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { iOSUIKit } from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import TextTicker from 'react-native-text-ticker';

Icon.loadFont();

export const Header = (props) => {
  const { title, leftIcon, rightIcon } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => leftIcon?.onPress()}>
        <Icon name={leftIcon?.name || 'ios-menu'} size={35} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        <TextTicker
          style={iOSUIKit.title3EmphasizedObject}
          numberOfLines={1}
          duration={7000}>
          {title || ''}
        </TextTicker>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => rightIcon?.onPress()}>
        {!!rightIcon?.name && (
          <Icon
            name={rightIcon?.name || 'ios-person-circle-outline'}
            size={35}
            color="black"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
