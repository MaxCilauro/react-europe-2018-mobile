import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class Create extends Component {
  state = {};

  onPressPost = () => {
    this.setState({
      text: ''
    });
  };

  blur() {
    if (this.state.text) {
      this.props.onSubmit(this.state.text)
    }

    this.setState({
      text: ''
    });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          label="Posty McPost Face"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          onBlur={() => { this.blur() }}
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
