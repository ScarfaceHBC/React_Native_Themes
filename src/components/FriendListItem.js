import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, Surface, Avatar, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { Dimensions } from "react-native";

export const FriendListItem = ({ friend }) => {
  const { name, dob, status, picture, email, dateOfBirth } = friend;

  const windowWidth = Dimensions.get("window").width;
  return (
    <Surface
      style={{
        flex: 1,
        elevation: 5,
        width: windowWidth * 0.95,
        marginHorizontal: 5,
        marginTop: 15,
      }}
    >
      <Pressable
        onPress={() =>
          alert(
            name.first + " " + name.last + " hat am " + dob.date + " Geburtstag"
          )
        }
        style={{}}
      >
        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar.Image
            size={60}
            source={{
              uri: picture.large,
            }}
          />
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {name.first} {name.last}
              </Text>

              <Text style={{ fontSize: 14, fontStyle: "italic" }}>{email}</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Kein Status verfügbar
              </Text>
            </View>
          </View>
          <IconButton
            icon="information-outline"
            size={35}
            onPress={() => alert("Info anzeigen")}
          />
        </View>
      </Pressable>
    </Surface>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
});