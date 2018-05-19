import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import { SemiBoldText } from '../../components/StyledText';
import { questionsRef } from '../../utils';

import Create from './Create';
import List from './List';

export default class Comments extends Component {
  state = {
    comments: []
  };

  questionsRef = null;

  componentDidMount() {
    const { talk } = this.props;
    this.questionsRef = questionsRef
      .where("talkId", "==", talk.id)
      .onSnapshot((querySnapshot) => {
        const comments = []
        querySnapshot.forEach((doc) => {
          const comment = doc.data();
          comment.id = doc.id
          comments.push(comment)
        });
        this.setState({ comments: comments })
      });
  }

  componentWillUnmount() {
    this.questionsRef();
  }

  getMyTicket () {
    return AsyncStorage.getItem("@MySuperStore:tickets")
      .then((value) => {
        const tickets = JSON.parse(value);
        return tickets[0];
      });
  }

  upvote ({ id, upvote }) {
    questionsRef.doc(comment.id).update({ upvotes: comment.upvotes + 1 })
  }

  async submitQuestion(content) {
    const ticket = await this.getMyTicket();
    const { talk } = this.props;

    questionsRef.add({
      talkId: talk.id,
      attendeeName: `${ticket.firstName} ${ticket.lastName}`,
      content: content,
      upvotes: 0
    })
  }

  render() {
    const { comments } = this.state;
    return (
      <View>
        <SemiBoldText>Comments Area</SemiBoldText>
        <List comments={comments} upvote={this.upvote} />
        <Create onSubmit={(question) => { this.submitQuestion(question) }} />
      </View>
    );
  }
}
