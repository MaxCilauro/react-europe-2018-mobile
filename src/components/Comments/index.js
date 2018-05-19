import React, { Component } from 'react';
import { View, AsyncStorage, Text } from 'react-native';
import { Accelerometer } from 'expo';
import { RegularText, SemiBoldText } from '../../components/StyledText';
import { questionsRef, raisedRef } from '../../utils';

import Create from './Create';
import List from './List';

export default class Comments extends Component {
  state = {
    comments: [],
    hasTickets: undefined,
    ticket: undefined,
    hasRaisedHands: [],
    hasPhoneRaised: false
  };

  questionsRef = null;
  raisedRef = null;

  onRaisedPhone() {
    const unsuscribe = Accelerometer.addListener(accelerometerData => {
      if (accelerometerData.y < -1.2) {
        if (!this.state.hasPhoneRaised) {
          this.addNameToRaised();
          this.setState({ hasPhoneRaised: true });
          Accelerometer.removeAllListeners()
        }
      }
    });
  }

  addNameToRaised() {
    const { talk } = this.props;
    const { ticket } = this.state;
    raisedRef.add({
      name: `${ticket.firstName} ${ticket.lastName}`,
      talkId: talk.id
    });
  }

  componentDidMount() {
    const { talk } = this.props;
    this.getMyTicket().then(value => {
      if (!value) this.setState({ hasTickets: false });
      else {
        this.queryFirebase();
        this.setState({ hasTickets: true, ticket: value });
      }
    });

    this.raisedRef = raisedRef
      .where("talkId", "==", talk.id)
      .onSnapshot(querySnapshot => {
        const raisers = [];
        querySnapshot.forEach(doc => {
          const raiser = doc.data();
          raiser.id = doc.id;
          raisers.push(raiser);
          this.setState({
            hasRaisedHands: raisers
          });
        });
      });
    this.onRaisedPhone();
  }

  componentWillUnmount() {
    this.state.hasTickets ? this.questionsRef() : null;
    if (this.raisedRef) {
      this.raisedRef();
    }
    Accelerometer.removeAllListeners()
  }

  queryFirebase() {
    const { talk } = this.props;
    this.questionsRef = questionsRef
      .where('talkId', '==', talk.id)
      .orderBy('upvotes', 'desc')
      .onSnapshot(querySnapshot => {
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
      updatedUpvotedBy = upvotedBy.filter(votedId => votedId !== uid);
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
    const { comments, hasTickets, ticket, hasRaisedHands } = this.state;
    return (
      <View>
        {hasRaisedHands.length > 0 ? (
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 0,
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              flex: 1,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              marginBottom: 10,
              shadowOffset: { width: 2, height: 2 }
            }}
          >
            {hasRaisedHands.map((value) => <Text key={value.id}>{value.name}</Text>)}
            <Text>has/have a raised hand!</Text>
          </View>
        ) : (
          null
        )}
        {hasTickets ? (
          <View>
            <SemiBoldText>Comments Area</SemiBoldText>
            <List comments={comments} upvote={this.upvote} uid={ticket.id} />
            <Create
              userName={`${ticket.firstName} ${ticket.lastName}`}
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
