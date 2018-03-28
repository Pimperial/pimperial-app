import React from 'react';
import { Alert, Dimensions } from 'react-native'
import { Screen, View, TextInput, Button, Text, Image } from '@shoutem/ui';

let screen = Dimensions.get('window')

export default class Entry extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f8f8',
                width: screen.width
            }}>
                <Text>Profile</Text>
            </View>
        )
    }
}