import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Item } from '../src/models';
import { DataStore } from "aws-amplify";

export default class Landing extends Component {
    async create() {
        let response = await DataStore.save(
            new Item({
                title: "Create From App"
            })
        );

        console.log(response);
    }

    async observe() {
        let subscriber = DataStore.observe(Item).subscribe(item => {
            console.log(item);
        });

        console.log(subscriber);
    }

    pressCreate() {
        this.create();
    }

    componentDidMount() {
        this.observe();
    }

    render() {
        return (
            <SafeAreaView
                style = {{justifyContent: "center"}}
            >
                <TouchableOpacity
                    style = {{alignSelf: "center", borderRadius: 8, backgroundColor: "#55f"}}
                    onPress = {() => this.pressCreate()}
                >
                    <Text
                        style = {{fontSize: 16, fontWeight: "500", marginHorizontal: 32, marginVertical: 16}}
                    >
                        Test create
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}