import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, Modal, Dimensions, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const screen = Dimensions.get("screen");
const WIDTH = screen.width;
const HEIGHT = (screen.width / 9) * 16;

export const ReviewPhoto = ({ data, onClick, visible }) => {
  const [headerShow, setHeaderShow] = useState(true);
  const [isPanEnabled, setIsPanEnabled] = useState(true);

  const scale = useSharedValue(1);
  const previousScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const previousX = useSharedValue(0);
  const previousY = useSharedValue(0);
  const bgColor = useSharedValue("#000000");
  const headerTranslateY = useSharedValue(0);
  const footerTranslateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const goBack = () => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    focalX.value = 0;
    focalY.value = 0;
    onClick();
  };

  const panGesture = Gesture.Pan()
    .enabled(isPanEnabled)
    .onBegin(() => {
      if (scale.value === 1) {
        previousX.value = 0;
        previousY.value = 0;
      }
    })
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = previousX.value + e.translationX;
        translateY.value = previousY.value + e.translationY;
      }
      if (scale.value === 1) {
        translateY.value = e.translationY;
        if (translateY.value > 20 || translateY.value < -20) {
          bgColor.value = "#00000080";
        }
        if (translateY.value > 100 || translateY.value < -100) {
          bgColor.value = "#00000030";
        }
      }
    })
    .onEnd((e) => {
      if (scale.value > 1) {
        previousX.value = translateX.value;
        previousY.value = translateY.value;
        return;
      }
      if (e.translationY < 300 || e.translationY > -300) {
        scale.value = withSpring(1, { stiffness: 150, damping: 25 });
        translateX.value = withSpring(0, { stiffness: 150, damping: 25 });
        translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
        bgColor.value = withSpring("#000000");
      }
      if (
        (scale.value === 1 && translateY.value > 250) ||
        translateY.value < -250
      ) {
        onClick();
      }
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin((e) => {
      setIsPanEnabled(false);
      if (scale.value === 1) {
        previousScale.value = 1;
      }
    })
    .onUpdate((e) => {
      if (scale.value <= 3 || e.scale < 1) {
      scale.value = e.scale * previousScale.value;
      focalX.value = e.focalX;
        focalY.value = e.focalY;
        console.log("EEE", e)
      }
      // fixed focal!!!!!

    })
    .onEnd((e) => {
      if (scale.value < 1) {
        scale.value = withSpring(1, { stiffness: 150, damping: 25 });
        focalX.value = withSpring(0, { stiffness: 150, damping: 25 });
        focalY.value = withSpring(0, { stiffness: 150, damping: 25 });
        translateX.value = withSpring(0, { stiffness: 150, damping: 25 });
        translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
        bgColor.value = withSpring("#000000");
      }
      if (e.scale > 1) {
        previousScale.value = scale.value;
      } else {
        previousScale.value = 1;
      }
      
      setIsPanEnabled(true);
    });

  const tapGesture = Gesture.Tap().onTouchesUp(() => {
    setHeaderShow(!headerShow);
    if (headerShow) {
      headerTranslateY.value = withTiming(0);
      footerTranslateY.value = withTiming(0);
    } else {
      headerTranslateY.value = withTiming(-100);
      footerTranslateY.value = withTiming(100);
    }
  });

  const animatedStyleImage = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -WIDTH / 2 },
        { translateY: -HEIGHT / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: WIDTH / 2 },
        { translateY: HEIGHT / 2 },
      ],
    };
  }, [scale, focalX, focalY]);

  const animatedStyleImageBox = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, [translateX, translateY]);

  const animatedStyleView = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  }, [bgColor]);

  const animatedStyleHeader = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: headerTranslateY.value }],
    };
  }, [headerTranslateY]);

  const animatedStyleFooter = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: footerTranslateY.value }],
    };
  }, [footerTranslateY]);

  const composed = Gesture.Simultaneous(pinchGesture, panGesture, tapGesture);

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <GestureDetector gesture={composed}>
        <Animated.View style={[styles.container, animatedStyleView]}>
          <Animated.View style={[styles.header, animatedStyleHeader]}>
            <Feather
              name="arrow-left"
              size={24}
              color="#FFFFFF"
              style={{ marginHorizontal: 16 }}
              onPress={goBack}
            />
          </Animated.View>
          <Animated.View style={[animatedStyleImageBox]}>
            <Animated.Image
              source={{ url: data.item.photo }}
              style={[styles.image, animatedStyleImage]}
              resizeMode={"cover"}
            />
            </Animated.View>
          <Animated.View
            style={[styles.footer, animatedStyleFooter]}
          ></Animated.View>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start ",
    backgroundColor: "#000000",
    paddingBottom: 20,
  },
  footer: {
    position: "absolute",
    paddingBottom: 30,
    zIndex: 2,
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#000000",
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "#00000030",
  },
});







// Alternative option
//
//
//

// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
//   withTiming,
// } from "react-native-reanimated";
// import { StyleSheet, Dimensions } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import { PostFooter } from "../../components/Post/PostFooter";

// const screen = Dimensions.get("screen");

// export const ReviewPhoto = ({ data, onClick, visible, navigation }) => {
//   const [headerShow, setHeaderShow] = useState(true);
//   const [previosScale, setPreviosScale] = useState(1);

//   const { photo } = data.item;

//   const scale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const bgColor = useSharedValue("#000000");
//   const headerTranslateY = useSharedValue(0);
//   const footerTranslateY = useSharedValue(0);
//   const width = useSharedValue(0);
//   const height = useSharedValue(240);
//   const borderRadius = useSharedValue(50);
//   const position = useSharedValue("");
//   const top = useSharedValue(0);
//   const left = useSharedValue(0);

//   useEffect(() => {
//     if (visible) {
//       height.value = withSpring((screen.width / 9) * 16, {
//         stiffness: 150,
//         damping: 25,
//       });
//       width.value = withSpring(screen.width, { stiffness: 150, damping: 25 });
//       borderRadius.value = withSpring(0, { stiffness: 150, damping: 25 });
//       position.value = "absolute";
//       top.value = withSpring(0, { stiffness: 150, damping: 25 });
//       left.value = withSpring(-16, { stiffness: 150, damping: 25 });
//     } else {
//       height.value = withSpring(240, { stiffness: 150, damping: 25 });
//       width.value = withSpring(screen.width - 32, {
//         stiffness: 150,
//         damping: 25,
//       });
//       borderRadius.value = withSpring(8, { stiffness: 150, damping: 25 });
//       position.value = "";
//       top.value = withSpring(0, { stiffness: 150, damping: 25 });
//       left.value = withSpring(0, { stiffness: 150, damping: 25 });
//     }
//   }, [visible]);

//   const panGesture = Gesture.Pan()
//     .enabled(visible)
//     .onUpdate((e) => {
//       if (scale.value !== 1) {
//         translateX.value = e.translationX;
//         translateY.value = e.translationY;
//       }
//       if (scale.value === 1) {
//         translateY.value = e.translationY;
//         if (translateY.value > 80 || translateY.value < -80) {
//           bgColor.value = "#00000080";
//         }
//         if (translateY.value > 200 || translateY.value < -200) {
//           bgColor.value = "#00000020";
//         }
//       }
//     })
//     .onEnd((e) => {
//       if (e.translationY < 300 || e.translationY > -300) {
//         scale.value = withSpring(1, { stiffness: 150, damping: 25 });
//         translateX.value = withSpring(0, { stiffness: 150, damping: 25 });
//         translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
//         bgColor.value = withSpring("#000000");
//       }
//       if (
//         (scale.value === 1 && translateY.value > 300) ||
//         translateY.value < -300
//       ) {
//         onClick();
//       }
//     });

//   const pinchGesture = Gesture.Pinch()
//     .enabled(visible)
//     .onUpdate((e) => {
//       scale.value = e.scale;
//     })
//     .onEnd((e) => {
//       if (e.scale < 1) {
//         scale.value = withSpring(1, { stiffness: 150, damping: 25 });
//         translateX.value = withSpring(0, { stiffness: 150, damping: 25 });
//         translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
//         bgColor.value = withSpring("#000000");
//       }
//     });

//   const tapGesture = Gesture.Tap()
//     .enabled(visible)
//     .onTouchesUp(() => {
//       setHeaderShow(!headerShow);
//       if (headerShow) {
//         headerTranslateY.value = withTiming(0);
//         footerTranslateY.value = withTiming(0);
//       } else {
//         headerTranslateY.value = withTiming(-100);
//         footerTranslateY.value = withTiming(100);
//       }
//     });

//   const animatedStyleImage = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//         { scale: scale.value },
//       ],
//       height: height.value,
//       width: width.value,
//     };
//   }, [scale, translateX, translateY]);

//   const animatedStyleHeader = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: headerTranslateY.value }],
//     };
//   }, [headerTranslateY]);

//   const animatedStyleFooter = useAnimatedStyle(() => {
//     return {
//       transform: [{ translateY: footerTranslateY.value }],
//     };
//   }, [footerTranslateY]);

//   const animatedStyleImageContainer = useAnimatedStyle(() => {
//     return {
//       height: height.value,
//       width: width.value,
//       borderRadius: borderRadius.value,
//       position: position.value,
//       backgroundColor: bgColor.value,
//       top: top.value,
//       left: left.value,
//     };
//   }, [height, width, borderRadius, position, bgColor]);

//   const composed = Gesture.Simultaneous(pinchGesture, panGesture, tapGesture);

//   return (
//     <GestureDetector gesture={composed}>
//       <Animated.View style={[styles.container, animatedStyleImageContainer]}>
//         {visible && (
//           <Animated.View style={[styles.header, animatedStyleHeader]}>
//             <Feather
//               name="arrow-left"
//               size={24}
//               color="#FFFFFF"
//               style={{ marginHorizontal: 16 }}
//               onPress={onClick}
//             />
//           </Animated.View>
//         )}
//         <Animated.Image
//           source={{ url: photo }}
//           style={[styles.image, animatedStyleImage]}
//           resizeMode={"cover"}
//         />
//         {visible && (
//           <Animated.View style={[styles.footer, animatedStyleFooter]}>
//             <PostFooter navigation={navigation} data={data} nested />
//           </Animated.View>
//         )}
//       </Animated.View>
//     </GestureDetector>
//   );
// };
