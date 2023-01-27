import { View, StyleSheet, Modal, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useRef, createRef, useEffect } from "react";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";

export const ReviewPhoto = ({ data, onClick, visible }) => {
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setInitialPosition();
  }, [visible]);

  const pinchRef = createRef();
  const panRef = createRef();

  const handlePinchStateChange = (e) => {
    e.persist();
    if (e.nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }
    const onScale = e.nativeEvent.scale;
    if (e.nativeEvent.state === State.END) {
      if (onScale < 1) {
        setInitialPosition();
      }
    }
  };

  const setInitialPosition = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setPanEnabled(false);
  };

  const onPinchEvent = Animated.event([{ nativeEvent: { scale: scale } }], {
    useNativeDriver: true,
  });

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="#FFFFFF"
            style={{ marginHorizontal: 16 }}
            onPress={onClick}
          />
        </View>
        <PanGestureHandler
          onGestureEvent={onPanEvent}
          ref={panRef}
          simultaneousHandlers={[pinchRef]}
          enabled={panEnabled}
          failOffsetX={[-100000, 100000]}
          failOffsetY={[-100000, 100000]}
          shouldCancelWhenOutside
        >
          <Animated.View>
            <PinchGestureHandler
              onGestureEvent={onPinchEvent}
              ref={pinchRef}
              simultaneousHandlers={[panRef]}
              onHandlerStateChange={handlePinchStateChange}
            >
              <Animated.View>
                <Animated.Image
                  source={data}
                  style={[
                    styles.image,
                    { transform: [{ scale }, { translateX }, { translateY }] },
                  ]}
                  resizeMode={"contain"}
                  objectFit={"fill"}
                />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
        <View style={styles.footer}></View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start ",
    backgroundColor: "#00000080",
    paddingBottom: 20,
  },
  footer: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#00000080",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
    backgroundColor: "#00000030",
  },
});
