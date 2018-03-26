import React from 'react';
import { Alert } from 'react-native'
import { Screen, View, TextInput, Button, Text, Image } from '@shoutem/ui';


/*


 take in shortcode --> call /verify endpoint 
    --> sends email, returns tfa code
 take in auth code --> match with tfa code ?
    match --> hit /login and /getinfo
    fail --> refresh view, don't change state
    | more than 3 attempts --> restart verification process
                TODO: lock out account

*/



export default class Login extends React.Component {
    state = {
        shortcode: '',
        tfa: '',
        stage: 1,
        attempts: 0
    }
    render() {
        return (
            (this.state.stage == 1 &&
                <View style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{ marginBottom: 25 }}
                        source={require('./img/logo.png')}
                        styleName='medium-square'
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            contextMenuHidden={true}
                            keyboardType={'email-address'}
                            placeholder={'shortcode (e.g. xyz1234)'}
                            style={{ flex: 0.5 }}
                            onChangeText={(t) => {
                                this.setState({ shortcode: t })
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            style={{ flex: 0.4, marginTop: 20 }}
                            onPress={() => {
                                fetch(
                                    `http://54.91.147.183:3415/verify/${this.state.shortcode}`,
                                    { method: 'post' }
                                ).then((s) => s.text()).then((t) => {
                                    this.setState({ tfa: t })
                                }).catch((e) => {
                                    if (e) {
                                        console.log(e)
                                        Alert.alert(
                                            "It's not you, it's us.", "Our login servers are experiencing some difficulty; please try again later!"
                                        )
                                    }
                                })
                                this.setState({ stage: 2 })
                            }}>
                            <Text>Login</Text>
                        </Button>
                    </View>
                </View>
            ) || (this.state.stage == 2 &&
                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            autoFocus={true}
                            onChangeText={(t) => {
                                if (t.length == 6) {
                                    if (t == this.state.tfa) {
                                        fetch(
                                            `http://54.91.147.183:3415/login/${this.state.shortcode}`,
                                            { method: 'post' }
                                        ).then((s) => {
                                            fetch(
                                                `http://54.91.147.183:3415/who/is/${this.state.shortcode}`,
                                                { method: 'post' }
                                            ).then((s) => s.json()).then((j) => {
                                                this.props.user(j)
                                                Alert.alert(`Welcome, ${j.name}`)
                                            }).catch((e) => {
                                                if (e) {
                                                    console.log(e)
                                                    Alert.alert(
                                                        "It's not you, it's us.",
                                                        "We couldn't log you in, try again later!"
                                                    )
                                                }
                                            })
                                        }).catch((e) => {
                                            Alert.alert("That shortcode isn't registered to Imperial College London!")
                                            this.setState({
                                                shortcode: '',
                                                tfa: '',
                                                stage: 1,
                                                attempts: 0
                                            })
                                        })
                                    } else {
                                        let a = this.state.attempts + 1
                                        if (a > 3) this.setState({
                                            shortcode: '',
                                            tfa: '',
                                            stage: 1,
                                            attempts: 0
                                        })
                                        else this.setState({ attempts: a })
                                    }
                                }
                            }}
                            style={{
                                flex: 0.6,
                                fontSize: 36,
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                height: 100,
                                color: '#fff',
                                textAlign: 'center'
                            }}
                        />
                    </View>
                </View>
            )
        )
    }
}