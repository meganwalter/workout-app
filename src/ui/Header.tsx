import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../theme/colors';
import { Link } from 'react-router-native';

interface Props {
  navPath?: string;
  buttonText?: string;
  currentPage: string;
}

const Header: React.FC<Props> = ({ navPath, buttonText, currentPage }) => {
  return (
    <View style={styles.container}>
      {navPath && buttonText && (
        <Link style={styles.btn} to={navPath}>
          <Text style={styles.btnText}>{buttonText}</Text>
        </Link>
      )}
      <Text style={styles.heading}>{currentPage} Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: 30,
    paddingTop: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: colors.white,
    fontSize: 20,
  },
  btn: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default Header;
