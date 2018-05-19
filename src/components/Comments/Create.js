import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Accelerometer } from 'expo';

export default class Create extends Component {
  state = {
    hasPhoneRaised: false
  };

  componentDidMount() {
    this.onRaisedPhone();
  }

  onRaisedPhone() {
    Accelerometer.addListener(accelerometerData => {
      if (accelerometerData.z < -1.4) {
        this.setState({ hasPhoneRaised: true });
        console.warn('accelerometer.y', accelerometerData.z);
      } else {
        this.setState({ hasPhoneRaised: false });
      }
    });
  }

  sendInfoToFirebase() {
    if (this.state.hasPhoneRaised) console.warn('RAISED');
    else console.warn('NOT RAISED');
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
