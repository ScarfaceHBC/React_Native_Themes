import React from "react";
import { StyleSheet, Text, Alert, View } from "react-native";
import { PreferencesContext } from "../utils/ThemeContext";
import { Button, Modal } from "react-native-paper";
import { Vibration } from "react-native";
import { useTheme } from "react-native-paper";
import { Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { FAB } from "react-native-paper";
import { useState } from "react";
import { Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

export const FriendInfoModal = ({ scene }) => {
  const {
    showInfoModal,
    toggleInfoModal,
    aktiveFriend,
    setAktiveFriendFunc,
    removeFriend,
  } = React.useContext(PreferencesContext);
  const { colors } = useTheme();

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Achtung!",
      `${aktiveFriend.name.first} ${aktiveFriend.name.last} wird entfernt`,
      [
        {
          text: "Abbrechen",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => _removeFriend() },
      ]
    );

  const _openAlert = () => {
    Vibration.vibrate(100);
    createTwoButtonAlert();
  };

  const _closeModal = () => {
    // setAktiveFriendFunc(null);
    Vibration.vibrate(100);
    toggleInfoModal();
  };

  const _removeFriend = () => {
    Vibration.vibrate(100);
    removeFriend(aktiveFriend);
    //setAktiveFriendFunc(null);
    toggleInfoModal();
  };

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const isFocused = useIsFocused();

  return (
    <Modal
      visible={true}
      contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingTop: 25 }}>
        <Image
          source={{ uri: aktiveFriend.picture.large }}
          style={{
            width: useWindowDimensions().width * 0.5,
            height: useWindowDimensions().width * 0.5,
            alignSelf: "center",
            marginBottom: 25,
            borderWidth: 1.5,
            borderColor: "black",
            borderRadius: 15,
          }}
        />
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          {aktiveFriend.name.first} {aktiveFriend.name.last}
        </Text>
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontSize: 16,
            fontStyle: "italic",
            paddingVertical: 20,
          }}
        >
          {aktiveFriend.email}
        </Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ paddingRight: 20 }}>Status:</Text>
          <Text style={{ width: useWindowDimensions().width * 0.7 }}>
            {aktiveFriend.text}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center",
          marginBottom: 25,
        }}
      >
        <View>
          <Portal>
            <FAB.Group
              visible={isFocused}
              open={open}
              icon={open ? "minus" : "plus"}
              actions={[
                //{ icon: "plus", onPress: () => console.log("Pressed add") },
                {
                  icon: "account-remove-outline",
                  label: "Freund entfernen",
                  onPress: () => _openAlert(),
                  color: colors.text,
                  style: { backgroundColor: colors.error },
                  small: false,
                  labelTextColor: colors.text,
                  labelStyle: colors.background,
                },
                // {icon: "email",label: "Email",onPress: () => console.log("Pressed email"),},
                {
                  icon: "email",
                  label: "Nachricht senden",
                  onPress: () => alert("Funtkcion noch nicht implementiert"),
                  small: false,
                  style: { backgroundColor: colors.accent },
                  color: colors.text,
                  labelTextColor: colors.text,
                  labelStyle: colors.disabled,
                },
              ]}
              onStateChange={onStateChange}
              onPress={() => {
                if (open) {
                }
              }}
              style={{ paddingVertical: 50 }}
            />
          </Portal>
        </View>
        <Button
          mode="contained"
          raised
          compact={true}
          onPress={() => _closeModal()}
        >
          Zurück
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

/**
 *  <FAB
            style={{ position: "absolute", bottom: 100 }}
            small
            visible={fabVisible}
            icon="plus"
            onPress={() => console.log("")}
          />
          <FAB
            style={{ position: "absolute", bottom: 50 }}
            visible={fabVisible}
            label="Nachricht senden"
            icon="send"
            onPress={() => console.log("Message")}
          />
          <FAB
            style={{ position: "relative" }}
            small
            icon={fabSymbol}
            onPress={() => _openFab()}
          />
 */
