import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Title,
  Paragraph
} from "react-native-paper";
import { Colors, FontSizes } from '../../constants';

const keyExtractor = (item) => item.id.toString();

export default ({ comments, upvote }) => (
  <View>
    <FlatList
      data={comments}
      keyExtractor={keyExtractor}
      renderItem={(item) => (
        <Comment {...item.item} upvote={upvote} />
      )}
    />
  </View>
);

const Comment = ({ id, content, attendeeName, upvotes, upvote }) => (
  <Card>
    <CardContent>
      <Paragraph>{content}</Paragraph>
      <Paragraph style={styles.attendeeName}>{attendeeName}</Paragraph>
    </CardContent>
    <CardActions>
      <Text>{upvotes}</Text>
      <Button onPress={() => { upvote({ id, upvotes }) }}>Like</Button>
    </CardActions>
  </Card>
);

const styles = StyleSheet.create({
  attendeeName: {
    color: Colors.faint,
    fontSize: FontSizes.subtitle,
    textAlign: "right"
  }
})
