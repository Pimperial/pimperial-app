import React from 'react';
import { StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { Font, AppLoading } from 'expo';
import { View, Examples, Screen } from '@shoutem/ui';

import Login from './src/Login'

export default class App extends React.Component {
    state = {
        fontsAreLoaded: false,
        user: null,
        screen: 'login'
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
                            this.setState({ user: u })
                        })
                }} />
            )
            default: return (
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
                alignItems: 'center'
            }}>
                {this.getScreen()}
                <StatusBar barStyle="default" hidden={false} />
            </Screen>
        )
    }
}