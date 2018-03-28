import React from 'react';
import { Alert, Dimensions } from 'react-native'
import { Screen, View, TextInput, Button, Text, Image, NavigationBar, Title, Icon } from '@shoutem/ui';

let screen = Dimensions.get('window')

export default class Entry extends React.Component {
    getAge(email) {
        let year_started = email.split('@')[0].substr(ting2.length - 2, 2)
        let ting = new Date()
        let month_ting = ting.getMonth()
    }
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
                    centerComponent={<Title>EDIT PROFILE</Title>}
                    rightComponent={<Icon name="checkbox-on" onPress={() => {
                        Alert.alert("Saving profile!")
                    }} />}
                />
                <TextInput placeholder={"name"} />
                <Text style={{fontSize: 24}}>{this.props.user.name}</Text>
            </View>
        )
    }
}