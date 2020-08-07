import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { RouteComponentProps } from 'react-router-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import WorkoutCard from '../ui/WorkoutCard';
import { RootStoreContext } from '../stores/RootStore';
import colors from '../theme/colors';
import WorkoutTimer from '../ui/WorkoutTimer';
import Header from '../ui/Header';
import { ROUTES } from '../static/Routes';
import dayjs from 'dayjs';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

const CurrentWorkout: React.FC<Props> = observer(
  ({
    history,
    match: {
      params: { id },
    },
  }) => {
    const rootStore = useContext(RootStoreContext);

    useEffect(() => {
      return () => {
        rootStore.workoutTimerStore.endTimer();
      };
    }, [rootStore.workoutTimerStore]);

    const isCurrent = !id;

    const dateKey = decodeURIComponent(`${id}`) || '';
    console.log('date key', dateKey);

    return (
      <View style={styles.container}>
        <Header
          currentPage="Current Workout"
          navPath={ROUTES.HOME_ROUTE}
          buttonText="< Back"
        />
        <ScrollView style={styles.scroller}>
          <View style={styles.workoutCards}>
            {(isCurrent
              ? rootStore.workoutStore.currentExercises
              : rootStore.workoutStore.history[dateKey]
            ).map((e) => {
              return (
                <WorkoutCard
                  onSetPress={(setIndex: number) => {
                    const v = e.sets[setIndex];
                    rootStore.workoutTimerStore.startTimer();
                    let newValue: string;
                    if (v === '') {
                      newValue = `${e.reps}`;
                    } else if (v === '0') {
                      newValue = '';
                      rootStore.workoutTimerStore.endTimer();
                    } else {
                      newValue = `${parseInt(v) - 1}`;
                    }
                    e.sets[setIndex] = newValue;
                  }}
                  key={nanoid()}
                  exercise={e.exercise}
                  repsAndWeight={`${e.numSets}x${e.reps} ${e.weight}lbs`}
                  sets={e.sets}
                />
              );
            })}
            <Button
              title="SAVE"
              onPress={() => {
                if (isCurrent) {
                  rootStore.workoutStore.history[
                    dayjs().format('YYYY-MM-DD hh:mm')
                  ] = rootStore.workoutStore.currentExercises;
                  rootStore.workoutStore.currentExercises = [];
                }
                history.push(ROUTES.HOME_ROUTE);
              }}
            />
          </View>
        </ScrollView>
        {rootStore.workoutTimerStore.isRunning ? (
          <WorkoutTimer
            currentTime={rootStore.workoutTimerStore.display}
            percent={rootStore.workoutTimerStore.percent}
            onXPress={() => rootStore.workoutTimerStore.endTimer()}
          />
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
    width: '100%',
  },
  scroller: {
    width: '100%',
  },
  workoutCards: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    paddingBottom: 100,
    width: '100%',
  },
});

export default CurrentWorkout;
