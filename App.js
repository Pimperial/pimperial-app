import React from 'react';
import { StyleSheet, StatusBar, AsyncStorage, Dimensions, Alert } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples, Screen } from '@shoutem/ui';

import Login from './src/Login'
import Swiping from './src/Swiping'
import Profile from './src/Profile'
import Editor from './src/Editor'

let screen = Dimensions.get('window')

export default class App extends React.Component {
    state = {
        fontsAreLoaded: false,
        user: null,
        shortcode: null,
        screen: ''
    }
    constructor(props) {
        super(props)
        console.info("Starting!")
    }
    async componentWillMount() {
        await Font.loadAsync({
            'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf'),
            'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf'),
            'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf'),
            'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf'),
            'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf'),
            'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf'),
            'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf'),
            'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf'),
            'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf'),
            'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
            'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf'),
        })

        this.setState({ fontsAreLoaded: true })
    }

    getScreen() {
        switch (this.state.screen) {
            case 'login': return (
                <Login user={(u) => {
                    AsyncStorage.setItem('@Pimperial:shortcode', u.code)
                        .then(() => {
                            this.setState({ user: u, shortcode: u.code, screen: 'edit-profile' })
                        })
                }} />
            )
            case 'matchmaking': return (
                <Swiping edit={() => {
                    this.setState({ screen: 'edit-profile' })
                }} chat={() => {
                    Alert.alert('chat')
                }} />
            )
            case 'edit-profile': return (
                <Editor user={this.state.user} swiping={() => {
                    this.setState({ screen: 'matchmaking' })
                }} />
            )
            default:
                AsyncStorage.getItem('@Pimperial:shortcode')
                    .then((c) => {
                        if (c)
                            fetch(
                                `http://54.91.147.183:3415/who/is/${c}`,
                                { method: 'post' }
                            ).then((s) => s.json()).then((j) => {
                                this.setState({ user: j, shortcode: c, screen: 'matchmaking' })
                            }).catch((e) => {
                                if (e) {
                                    console.debug(e)
                                    Alert.alert(
                                        "It's not you, it's us! 😞",
                                        "We couldn't log you in, try again later!"
                                    )
                                }
                            })
                        else this.setState({ screen: 'login' })
                    })
                    .catch(() => {
                        this.setState({ screen: 'login' })
                    })
                return (
                    <AppLoading />
                )
        }
    }

    render() {
        if (!this.state.fontsAreLoaded) {
            return <AppLoading />;
        }

        return (
            <Screen style={{
                backgroundColor: '#003b73',
                alignItems: 'center',
            }}>
                {this.getScreen()}
                <StatusBar barStyle="default" hidden={true} />
            </Screen>
        )
    }
}