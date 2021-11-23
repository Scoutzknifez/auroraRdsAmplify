import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Item } from '../src/models';
import { DataStore } from "aws-amplify";

export default class Landing extends Component {
    async temp() {
        DataStore.observe(Item).subscribe(item => {
            console.log(item);
        });
    }

    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        );
    }
}