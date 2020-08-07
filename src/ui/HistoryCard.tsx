import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import colors from '../theme/colors';
import { CurrentExercise } from '../stores/WorkoutStore';

interface Props {
  day: string;
  currentExercises: CurrentExercise[];
  onPress: () => void;
}

const exerciseShortName = {
  Squat: 'SQ',
  'Bench Press': 'BP',
  Deadlift: 'DL',
  'Overhead Press': 'OP',
  'Barbell Row': 'ROW',
};

const HistoryCard: React.FC<Props> = ({ day, currentExercises, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text>{day}</Text>
      {currentExercises.map((ce) => {
        return (
          <Text key={nanoid()} style={styles.cardText}>
            {`${
              exerciseShortName[ce.exercise as keyof typeof exerciseShortName]
            } ${ce.numSets}x${ce.reps} ${ce.weight}lbs`}
          </Text>
        );
      })}
    </TouchableOpacity>
  );
};

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
    padding: 10,
    width: '49%',
  },
  cardText: {},
});

export default HistoryCard;
