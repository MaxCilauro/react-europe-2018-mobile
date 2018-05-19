import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableHighlight, Animated } from 'react-native';
import { ListItem } from 'react-native-paper';
import { Colors, FontSizes } from '../../constants';
import { RegularText } from '../StyledText';
import Ionicons from '@expo/vector-icons/Ionicons';

const keyExtractor = item => item.id.toString();

export default ({ comments, upvote, uid }) => (
  <View>
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={item => <Comment {...item.item} upvote={upvote} uid={uid} />}
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
      duration: 2000
    }).start();
  }

  render() {
    const { id, content, attendeeName, upvotes, upvote, upvotedBy, uid } = this.props;
    const hasVoted = upvotedBy.some((voted) => voted === uid);

    return (
      <Animated.View style={{ opacity: this.state.fadeAnim }}>
        <TouchableHighlight style={{backgroundColor: "#ffffff"}}
          onPress={() => {
            if (!hasVoted) {
              upvote({ id, upvotedBy, upvotes, uid });
            }
          }}
          activeOpacity={0.6}
          underlayColor="#ffffff"
        >
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <View style={{ marginRight: 5, flexDirection: 'column', alignItems: 'center' }}>
              <Ionicons name="md-thumbs-up" size={32} color={hasVoted ? Colors.blue : Colors.faint} />
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
