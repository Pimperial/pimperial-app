import React from 'react';
import { Alert, Dimensions, Linking } from 'react-native'
import { Screen, View, TextInput, Button, Text, Image, NavigationBar, Title, Icon } from '@shoutem/ui';

let screen = Dimensions.get('window')

export default class Entry extends React.Component {
    getAge(email) {
        let year_started = email.split('@')[0]
        year_started = year_started.substr(year_started.length - 2, 2)
        let ting = new Date()
        let month_ting = ting.getMonth()
        let year_ting = ting.getYear() - 100
        let years = year_ting - year_started
        if (month_ting < 7) years -= 1 // 0 indexed years
        return years + 1
    }
    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#f8f8f8',
                width: screen.width
            }}>
                <NavigationBar
                    centerComponent={<Title>EDIT PROFILE</Title>}
                    rightComponent={<Icon name="checkbox-on" onPress={() => {
                        Alert.alert("Saving profile!")
                    }} />}
                />
                <View style={{
                    flex: 0.95, marginTop: screen.height / 10
                }}>
                    <View style={{
                        flex: 0.5,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginRight: 10,
                                marginBottom: 10,
                                justifyContent: 'center'
                            }}>
                                <Icon name='plus-button' style={{
                                    fontSize: 96,
                                    color: '#888a'
                                }} />
                            </View>
                            <View style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginBottom: 10,
                                justifyContent: 'center'
                            }}>
                                <Icon name='plus-button' style={{
                                    fontSize: 96,
                                    color: '#888a'
                                }} />
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginRight: 10,
                                justifyContent: 'center'
                            }}>
                                <Icon name='plus-button' style={{
                                    fontSize: 96,
                                    color: '#888a'
                                }} />
                            </View>
                            <View style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                justifyContent: 'center'
                            }}>
                                <Icon name='plus-button' style={{
                                    fontSize: 96,
                                    color: '#888a'
                                }} />
                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginLeft: 20, marginRight: 20, flex: 0.55
                    }}>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>
                            {this.props.user.name}, Year {this.getAge(this.props.user.email)}
                        </Text>
                        <Text style={{ fontSize: 16, marginTop: 5 }}>{this.props.user.degree.split('|')[0]}</Text>
                        <TextInput multiline={true} numberOfLines={9} maxLength={400} style={{
                            height: screen.height / 4,
                            textAlignVertical: 'top',
                            marginTop: 20,
                            borderWidth: 0.2, borderColor: '#bbb'
                        }} placeholder={"Tell us about yourself!"} />
                        <Text style={{
                            alignSelf: 'center',
                            marginTop: 30
                        }}>Made with ❤ by students like you. &nbsp;
                            <Text style={{
                                color: '#19d8c1',
                            }} onPress={() => {
                                Linking.openURL('https://github.com/Pimperial')
                            }}>
                                Wanna help?
                            </Text>
                        </Text>
                        <Text style={{
                            alignSelf: 'center',
                        }}>🐞 Did something go wrong? 🐞&nbsp;
                            <Text style={{
                                color: '#d80909',
                            }} onPress={() => {
                                Linking.openURL('https://messenger.com/t/pimperial')
                            }}>
                                Send us feedback!
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}