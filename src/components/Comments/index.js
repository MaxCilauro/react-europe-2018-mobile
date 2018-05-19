import React, { Component } from 'react';
import { View } from 'react-native';
import { SemiBoldText } from '../../components/StyledText';

import Create from './Create';
import List from './List';

const comments = [
  {
    id: 1234,
    content: 'This is my fancy question. Look how smart i am',
    attendeeName: 'Johannes Nielsen',
    likes: 5
  },
  {
    id: 1265,
    content:
      'What is the meaning of life? like in the grand scheme of things it all seems very confusing',
    attendeeName: 'Maximiliano Ciluaro',
    likes: 0
  },
  {
    id: 3421,
    content:
      'If eight ducks are crossing the streat at intervals of 27 seconds, what is the name of the bakers daughter?',
    attendeeName: 'Pedro Early-riser',
    likes: 3
  },
  {
    id: 8984,
    content: 'I am still very smart, please notice me!',
    attendeeName: 'Johannes Nielsen',
    likes: 100
  }
];

export default class Comments extends Component {
  state = {
    comments: comments
  };

  render() {
    return (
      <View>
        <SemiBoldText>Comments Area</SemiBoldText>
        <List comments={this.state.comments} />
        <Create />
      </View>
    );
  }
}
