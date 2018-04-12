import React from 'react';
import { Alert, Dimensions } from 'react-native'
import { Screen, View, TextInput, Button, Text, Image, NavigationBar, Icon, Title } from '@shoutem/ui';

let screen = Dimensions.get('window')

export default class Swiping extends React.Component {
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f8f8',
                width: screen.width
            }}>
                <NavigationBar
                    leftComponent={<Icon name="user-profile" onPress={this.props.edit} />}
                    centerComponent={<Title>Filters</Title>}
                    rightComponent={<Icon name="comment" onPress={this.props.chat} />}
                />
                <Text>Swiping</Text>
            </View>
        )
    }
}