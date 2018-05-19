import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Accelerometer } from 'expo';
import { raisedRef } from '../../utils';

export default class Create extends Component {
  state = {
    hasPhoneRaised: false,
    hasRaisedHand: []
  };

  raisedRef = null;

  componentDidMount() {
    this.raisedRef = raisedRef
      .where("talkId", "==", this.props.talkId)
      .onSnapshot(querySnapshot => {
        const raisers = [];
        querySnapshot.forEach(doc => {
          const raiser = doc.data();
          raiser.id = doc.id;
          raisers.push(raiser);
          this.setState({
            hasRaisedHand: raisers
          });
        });
      });
    this.onRaisedPhone();
  }

  componentWillUnmount () {
    if (this.raisedRef) {
      this.raisedRef();
    }
  }

  onRaisedPhone() {
    Accelerometer.addListener(accelerometerData => {
      if (accelerometerData.y < -1.2) {
        if (!this.state.hasPhoneRaised) {
          this.addNameToRaised();
          this.setState({ hasPhoneRaised: true });
        }
      }
    });
  }

  addNameToRaised() {
    const { talkId, userName } = this.props;
    raisedRef.add({
      name: userName,
      talkId
    });
  }

  onPressPost = () => {
    this.setState({
      text: ''
    });
  };

  blur() {
    if (this.state.text) {
      this.props.onSubmit(this.state.text);
    }

    this.setState({
      text: ''
    });
  }

  render() {
    console.warn(this.state.hasRaisedHand)
    return (
      <View style={styles.wrapper}>
        <TextInput
          label="Write a comment"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onBlur={() => {
            this.blur();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    flex: 1
  }
});
