// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet, Animated, Platform } from 'react-native';

// const Loader = () => {
//   const spins = Array(8).fill(0).map(() => useRef(new Animated.Value(0)).current);

//   const animate = () => {
//     const animations = spins.map((spin, index) => 
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(spin, {
//             toValue: 1,
//             duration: 1000,
//             delay: index * 100,
//             useNativeDriver: true,
//           }),
//           Animated.timing(spin, {
//             toValue: 0,
//             duration: 1000,
//             useNativeDriver: true,
//           }),
//         ])
//       )
//     );

//     Animated.parallel(animations).start();
//   };

//   useEffect(() => {
//     animate();
//   }, []);

//   const getTransform = (spin: Animated.Value) => ({
//     transform: [
//       { 
//         rotate: spin.interpolate({
//           inputRange: [0, 1],
//           outputRange: ['0deg', '90deg']
//         }) 
//       }
//     ],
//     opacity: spin.interpolate({
//       inputRange: [0, 0.5, 1],
//       outputRange: [1, 0.7, 1]
//     })
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.spinner}>
//         {spins.map((spin, index) => (
//           <Animated.View
//             key={index}
//             style={[
//               styles.line,
//               { left: 80 - index * 10 },
//               getTransform(spin)
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   spinner: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginLeft: -75,
//   },
//   line: {
//     position: 'absolute',
//     top: '50%',
//     width: 35,
//     height: 7,
//     backgroundColor: '#fff',
//     borderRadius: 3,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 2, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 2,
//       },
//       android: {
//         elevation: 3,
//       },
//     }),
//   },
// });

// export default Loader;
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';

const HorizontalLoader = () => {
  const animations = Array(5)
    .fill(null)
    .map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const animate = (index: number) => {
      const timing = Animated.loop(
        Animated.sequence([
          Animated.timing(animations[index], {
            toValue: 1,
            duration: index % 2 === 0 ? 1000 : 1100,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0,
            duration: index % 2 === 0 ? 1000 : 1100,
            useNativeDriver: true,
          })
        ])
      );
      timing.start();
    };

    animations.forEach((_, index) => animate(index));
  }, []);

  const getTransform = (index: number) => {
    const translateY = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: index % 2 === 0 ? [-15, 15] : [15, -15]
    });

    return {
      transform: [{ translateY }],
    };
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.horizontalContainer}>
        {animations.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.ball,
              getTransform(index),
              Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 2,
                },
                android: {
                  elevation: 3,
                },
              }),
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 50,
    backgroundColor: '#840094',
  },
});

export default HorizontalLoader;