import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { RegularText, SemiBoldText } from '../../components/StyledText';
import { questionsRef } from '../../utils';

import Create from './Create';
import List from './List';

export default class Comments extends Component {
  state = {
    comments: [],
    hasTickets: undefined,
    ticket: undefined
  };

  questionsRef = null;

  componentDidMount() {
    this.getMyTicket().then(value => {
      if (!value) this.setState({ hasTickets: false });
      else {
        this.queryFirebase();
        this.setState({ hasTickets: true, ticket: value });
      }
    });
  }

  componentWillUnmount() {
    this.state.hasTickets ? this.questionsRef() : null;
  }

  queryFirebase() {
    const { talk } = this.props;
    this.questionsRef = questionsRef.where('talkId', '==', talk.id).onSnapshot(querySnapshot => {
      const comments = [];
      querySnapshot.forEach(doc => {
        const comment = doc.data();
        comment.id = doc.id;
        comments.push(comment);
      });

      this.setState({ comments: comments });
    });
  }

  getMyTicket() {
    return AsyncStorage.getItem('@MySuperStore:tickets').then(value => {
      const tickets = JSON.parse(value);
      if (!tickets) return null;

      return tickets[0];
    });
  }

  upvote({ id, upvotes, upvotedBy, uid, hasVoted }) {
    let updatedUpvotedBy;
    if (hasVoted) {
      updatedUpvotedBy = upvotedBy.filter((votedId) => votedId !== uid);
    } else {
      updatedUpvotedBy = [...upvotedBy, uid];
    }
    const totalUpvotes = hasVoted ? upvotes - 1 : upvotes + 1;
    questionsRef.doc(id).update({ upvotes: totalUpvotes, upvotedBy: updatedUpvotedBy });
  }

  async submitQuestion(content) {
    const { ticket } = this.state;
    const { talk } = this.props;

    questionsRef.add({
      talkId: talk.id,
      attendeeName: `${ticket.firstName} ${ticket.lastName}`,
      content: content,
      upvotes: 0,
      upvotedBy: []
    });
  }

  render() {
    const { comments, hasTickets, ticket } = this.state;
    return (
      <View>
        {hasTickets ? (
          <View>
            <SemiBoldText>Comments Area</SemiBoldText>
            <List comments={comments} upvote={this.upvote} uid={ticket.id} />
            <Create
              onSubmit={question => {
                this.submitQuestion(question);
              }}
            />
          </View>
        ) : (
          <View>
            <RegularText>You need to have a ticket scanned first!</RegularText>
          </View>
        )}
      </View>
    );
  }
}
