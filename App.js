import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withAuthenticator } from 'aws-amplify-react-native';

import Landing from "./screens/Landing";

import Amplify from "aws-amplify";
import config from './src/aws-exports';

Amplify.configure({
    ...config,
    // Adding this below stops this analytics error:
    // Error: No credentials, applicationId or region
    Analytics: {
        disabled: true
    }
});

const navigationStack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <navigationStack.Navigator
                initialRouteName = "Landing"
            >
                <navigationStack.Screen
                    name = "Landing"
                    component = { Landing }
                    options = {{
                        headerShown: true,
                        animationEnabled: false
                    }}
                />
            </navigationStack.Navigator>
        </NavigationContainer>
    );
}

export default withAuthenticator(App);