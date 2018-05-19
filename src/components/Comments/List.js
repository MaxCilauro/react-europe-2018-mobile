import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem } from "react-native-paper";
import { Colors, FontSizes } from '../../constants';
import { RegularText } from '../StyledText';

const keyExtractor = (item) => item.id.toString();

export default ({ comments }) => (
  <View>
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={(item) => (
        <Comment {...item.item} />
      )}
    />
  </View>
);

const Comment = ({ id, content, attendeeName, likes }) => (
  <View style={{ display: "flex" }}>
    <View style={{ flex: "0 0 20%"}}>
      <RegularText>{likes}</RegularText>
    </View>
    <View style={{ flex: "1 1" }}>
      <View><RegularText>{content}</RegularText></View>
      <View><RegularText>{attendeeName}</RegularText></View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  attendeeName: {
    color: Colors.faint,
    textAlign: "right"
  }
});

