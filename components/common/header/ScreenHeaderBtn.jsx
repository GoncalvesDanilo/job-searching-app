import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import styles from './screenheader.style';

const ScreenHeaderBtn = ({ iconUrl, dimentions, handlePress }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image source={iconUrl} style={styles.btnImg(dimentions)} resizeMode='cover' />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
