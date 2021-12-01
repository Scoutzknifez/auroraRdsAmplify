import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Item } from '../src/models';
import { DataStore, Auth, Predicates } from "aws-amplify";

interface LandingState {
    items: any[]
};

export default class Landing extends Component<any, LandingState> {
    subscriber: any;

    constructor(props: any) {
        super(props);

        this.state = {
            items: []
        };
    }

    async query() {
        var cognitoUser: any;

        try {
            cognitoUser = await Auth.currentAuthenticatedUser();
        }
        catch (err) {
            console.log(err);
            return;
        }

        if (cognitoUser == null) {
            return;
        }

        var items = await DataStore.query(
            Item
        );

        this.setState(prevState => ({
            ...prevState,
            items
        }));
    }

    async create() {
        let response = await DataStore.save(
            new Item({
                title: "Create From App"
            })
        );
    }

    async update(item: any) {
        let response = await DataStore.save(
            Item.copyOf(item, updated => {
                updated.title = `${updated.title} + update`
            })
        );

        console.log(response);
    }

    async observe() {
        this.subscriber = DataStore.observe(Item).subscribe(observed => {
            let action = observed.opType;
            let element = observed.element;
            let newItemList = Array.from(this.state.items);

            if (action == "INSERT") {
                newItemList.push(element);
            }
            else if (action == "UPDATE") {
                for (let i = 0; i < newItemList.length; i++) {
                    const item = newItemList[i];

                    if (item.id == element.id) {
                        newItemList[i] = element;
                    }
                }
            }
            else if (action == "DELETE") {
                for (let i = 0; i < newItemList.length; i++) {
                    const item = newItemList[i];

                    if (item.id == element.id) {
                        newItemList.splice(i, 1);
                    }
                }
            }

            this.setState(prevState => ({
                ...prevState,
                items: newItemList
            }));
        });
    }

    async delete() {
        let response = await DataStore.delete(Item, Predicates.ALL);
    }

    pressCreate() {
        this.create();
    }

    pressEntry(item: any) {
        this.update(item);
    }

    pressDelete() {
        this.delete();
    }

    componentDidMount() {
        this.query();
        this.observe();
    }

    componentWillUnmount() {
        this.subscriber.unsubscribe();
    }

    renderList() {
        var elements: any[] = [];

        this.state.items.forEach(item => {
            elements.push(
                <TouchableOpacity
                    key = {item.id}
                    onPress = {() => this.pressEntry(item)}
                    style = {{justifyContent: "center", borderRadius: 8, marginTop: 12, backgroundColor: "#888"}}
                >
                    <Text
                        style = {{alignSelf: "center", paddingVertical: 8, paddingHorizontal: 12}}
                    >
                        {item.title}
                    </Text>
                </TouchableOpacity>
            );
        });

        return (
            <ScrollView
                style = {{marginHorizontal: 16}}
            >
                {elements}
            </ScrollView>
        )
    }

    render() {
        return (
            <SafeAreaView
                style = {{justifyContent: "center"}}
            >
                <View
                    style = {{flexDirection: "row", marginTop: 10, justifyContent: "space-evenly"}}
                >
                    <TouchableOpacity
                        style = {{alignSelf: "center", borderRadius: 8, backgroundColor: "#55f"}}
                        onPress = {() => this.pressCreate()}
                    >
                        <Text
                            style = {{fontSize: 16, fontWeight: "500", marginHorizontal: 32, marginVertical: 16}}
                        >
                            Create
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {{alignSelf: "center", borderRadius: 8, backgroundColor: "#f55"}}
                        onPress = {() => this.pressDelete()}
                    >
                        <Text
                            style = {{fontSize: 16, fontWeight: "500", marginHorizontal: 32, marginVertical: 16}}
                        >
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>

                {this.renderList()}
            </SafeAreaView>
        );
    }
}