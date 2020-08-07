import { observer } from 'mobx-react-lite';
import React from 'react';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../theme/colors';

interface Props {
  exercise: string;
  repsAndWeight: string;
  sets: string[];
  onSetPress: (index: number) => void;
}

const WorkoutCard: React.FC<Props> = observer(
  ({ exercise, repsAndWeight, sets, onSetPress }) => {
    const renderSet = (set: string, i: number) => {
      const emptySet = set === '';
      return set === 'X' ? (
        <View style={[styles.bottomCircle, styles.grey]} key={nanoid()}>
          <Text style={styles.bottomText}>{set}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => onSetPress(i)}
          style={[styles.bottomCircle, emptySet && styles.grey]}
          key={nanoid()}>
          <Text style={styles.bottomText}>{set}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.topText}>{exercise}</Text>
          <Text>{repsAndWeight}</Text>
        </View>
        <View style={styles.bottom}>
          {sets.map((set, i) => renderSet(set, i))}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 3,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: 'column',
    marginBottom: 10,
    width: '100%',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  topText: {
    fontSize: 16,
  },
  bottom: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomCircle: {
    borderRadius: 25,
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grey: {
    backgroundColor: colors.darkGrey,
  },
  bottomText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default WorkoutCard;
