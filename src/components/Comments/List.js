import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-paper';
import { Colors, FontSizes } from '../../constants';
import { RegularText } from '../StyledText';
import Ionicons from '@expo/vector-icons/Ionicons';

const keyExtractor = item => item.id.toString();

export default ({ comments, onPressComment }) => (
  <View>
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={item => <Comment onPressComment={onPressComment} {...item.item} />}
    />
  </View>
);

const Comment = ({ id, content, attendeeName, likes, onPressComment }) => (
  <TouchableHighlight onPress={() => onPressComment({ id })}>
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
      <View style={{ marginRight: 5, flexDirection: 'column', alignItems: 'center' }}>
        <Ionicons name="md-thumbs-up" size={32} color="gray" />
        <Text>{likes}</Text>
      </View>

      <View style={{ flexDirection: 'column' }}>
        <Text style={{ padding: 5 }}>{content}</Text>
        <Text style={{ color: Colors.faint }}>{attendeeName}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  attendeeName: {
    color: Colors.faint,
    textAlign: 'right'
  }
});
