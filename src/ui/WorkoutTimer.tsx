import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../theme/colors';

interface Props {
  onXPress: () => void;
  currentTime: string;
  percent: string;
}

const WorkoutTimer: React.FC<Props> = ({ onXPress, currentTime, percent }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { width: percent }]} />
      <View style={styles.inner}>
        <Text style={styles.timer}>{currentTime}</Text>
        <TouchableOpacity onPress={onXPress}>
          <Text style={styles.close}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: colors.timer,
  },
  inner: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 35,
  },
  line: {
    height: 3,
    width: '50%',
    backgroundColor: colors.secondary,
  },
  timer: {
    color: colors.white,
    fontSize: 30,
  },
  close: {
    color: colors.grey,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default WorkoutTimer;
