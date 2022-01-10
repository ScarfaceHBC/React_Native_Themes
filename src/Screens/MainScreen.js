import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme, Modal, Portal } from "react-native-paper";
import { Button, Headline, Avatar, TextInput, Text } from "react-native-paper";
import { PreferencesContext } from "../utils/ThemeContext";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FireBaseScreen";
import { db } from "./FireBaseScreen";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";

export const MainScreen = () => {
  const { colors } = useTheme();
  const { setStatusFunc, currentUserName, setCurrentUsernameFunc } =
    React.useContext(PreferencesContext);
  const [currentUserData, setCurrentUserData] = useState({});
  const [statusModal, setStatusModal] = useState(false);
  const [statusMessage, setstatusMessage] = useState("");
  const [newStatusMessage, setnewStatusMessage] = useState("");
  const window = useWindowDimensions();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      _getUserFromFirebase();
      _getStatusUpdate();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const _getUserFromFirebase = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user);
        setCurrentUsernameFunc(user.email);
        setCurrentUserData({
          name: user.displayName,
          username: user.email,
          password: "",
          picture: user.photoURL,
        });

        _setFriendOnline(user);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };

  const _setFriendOnline = async (user) => {
    try {
      await setDoc(
        doc(db, `Users`, `${currentUserName}`),
        {
          name: user.displayName,
          username: user.email,
          picture: user.photoURL,
        },
        { merge: true }
      );
      console.log("saved User");
    } catch (error) {
      console.log(error);
    }
  };

  const _showStatusModal = () => {
    setStatusModal(!statusModal);
  };

  const _getStatusUpdate = async () => {
    const querySnapshot = await getDoc(doc(db, `Users`, `${currentUserName}`));
    setstatusMessage(querySnapshot.data().status);
    console.log("onlineArray: ", querySnapshot.data().status);
  };

  const _setStatus = () => {
    _setStatusOnline(newStatusMessage);
    _getStatusUpdate();
    setStatusModal(!statusModal);
    setnewStatusMessage("");
  };

  const _setStatusOnline = async (statusMessage) => {
    try {
      await updateDoc(
        doc(db, `Users`, `${currentUserName}`),
        {
          status: statusMessage,
        },
        { merge: true }
      );
      console.log("saved Status");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 25,
          alignItems: "center",
        }}
      >
        <View>
          <Portal>
            <Modal
              visible={statusModal}
              contentContainerStyle={{
                backgroundColor: colors.background,
                padding: 20,
              }}
              style={{
                padding: 0,
              }}
              onDismiss={() => _showStatusModal()}
            >
              <Text
                style={{
                  paddingBottom: 20,
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Neuer Status
              </Text>
              <TextInput
                mode="outlined"
                label="Neuer Status"
                value={newStatusMessage}
                multiline={true}
                onChangeText={(status) => setnewStatusMessage(status)}
                style={{ height: 190 }}
              />
              <View
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingTop: 20,
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => _setStatus(statusMessage)}
                >
                  Speichern
                </Button>
                <Button mode="contained" onPress={() => _showStatusModal()}>
                  Abbrechen
                </Button>
              </View>
            </Modal>
          </Portal>
          <Headline
            style={{
              textAlign: "center",
              paddingVertical: 30,
              fontWeight: "bold",
              letterSpacing: 3,
              fontSize: 40,
            }}
          >
            Profil
          </Headline>
          <View
            style={{
              width: window.width,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingBottom: 20,
            }}
          >
            <View
              style={{ paddingLeft: 10, paddingRight: 20, paddingVertical: 20 }}
            >
              <Avatar.Image
                size={120}
                style={{ marginHorizontal: 30 }}
                source={{
                  uri: currentUserData.picture,
                }}
              />
            </View>
            <View style={{ justifyContent: "space-evenly" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Benutzername
              </Text>
              <Text>{currentUserName}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Name</Text>
              <Text>{currentUserData.name}</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Smartphone Model:
              </Text>
              <Text>{Device.modelName}</Text>
            </View>
          </View>
          <View style={{ paddingVertical: 30, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status:</Text>
            <Text style={{ fontSize: 18 }}>{statusMessage}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <Button
              onPress={() => alert("Noch nicht implementiert!")}
              color="red"
            >
              Logout
            </Button>
            <Button onPress={() => _showStatusModal()}>Status ändern</Button>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
