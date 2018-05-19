import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight, Animated } from 'react-native';
import { ListItem } from 'react-native-paper';
import { Colors, FontSizes } from '../../constants';
import { RegularText } from '../StyledText';
import Ionicons from '@expo/vector-icons/Ionicons';

const keyExtractor = item => item.id.toString();

export default ({ comments, upvote }) => (
  <View>
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={item => <Comment {...item.item} upvote={upvote} />}
    />
  </View>
);

class Comment extends Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };
  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  }

  render() {
    const { id, content, attendeeName, upvotes, upvote } = this.props;

    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        <TouchableHighlight onPress={() => upvote({ id, upvotes })}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <View style={{ marginRight: 5, flexDirection: 'column', alignItems: 'center' }}>
              <Ionicons name="md-thumbs-up" size={32} color="gray" />
              <Text>{upvotes}</Text>
            </View>

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ padding: 5 }}>{content}</Text>
              <Text style={{ color: Colors.faint }}>{attendeeName}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  attendeeName: {
    color: Colors.faint,
    textAlign: 'right'
  }
});
