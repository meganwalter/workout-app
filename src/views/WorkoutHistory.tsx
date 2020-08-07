import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteComponentProps } from 'react-router-native';
import colors from '../theme/colors';
import { ROUTES } from '../static/Routes';
import { RootStoreContext } from '../stores/RootStore';
import HistoryCard from '../ui/HistoryCard';
import Header from '../ui/Header';

interface Props extends RouteComponentProps {}

const defaultExercises = [
  {
    exercise: 'Squat',
    numSets: 5,
    reps: 5,
    sets: ['', '', '', '', ''],
    weight: 120,
  },
  {
    exercise: 'Bench Press',
    numSets: 5,
    reps: 5,
    sets: ['', '', '', '', ''],
    weight: 60,
  },
  {
    exercise: 'Deadlift',
    numSets: 1,
    reps: 5,
    sets: ['', 'X', 'X', 'X', 'X'],
    weight: 90,
  },
];

const WorkoutHistory: React.FC<Props> = observer(({ history }) => {
  const rootStore = useContext(RootStoreContext);

  return (
    <View style={styles.container}>
      <Header currentPage="Workout History" />
      <View style={styles.view}>
        <View style={styles.historyWrapper}>
          {Object.entries(rootStore.workoutStore.history).map(([day, v]) => {
            const path = `${ROUTES.PAST_WORKOUT_ROUTE}/${encodeURIComponent(
              day,
            )}`;
            console.log('url', path);
            return (
              <HistoryCard
                onPress={() => history.push(path)}
                key={day}
                day={day}
                currentExercises={v}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            rootStore.workoutStore.currentExercises.push(...defaultExercises);
            history.push(ROUTES.CURRENT_WORKOUT_ROUTE);
          }}>
          <Text style={styles.btnText}>Create Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey,
    width: '100%',
  },
  view: {
    padding: 20,
  },
  historyWrapper: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    padding: 10,
  },
  btnText: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default WorkoutHistory;
