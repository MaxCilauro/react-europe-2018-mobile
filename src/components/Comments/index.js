import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Create from './Create';
import List from './List'


export default class Comments extends Component {
    render() {
        return (
        <View>
            <Text>Comments Area</Text>
        <List/>
        <Create/>

        </View>)
    }
}