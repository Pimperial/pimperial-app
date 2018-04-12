import React from 'react';
import { Alert, Dimensions, Linking } from 'react-native'
import { ImagePicker } from 'expo'
import { Screen, View, TextInput, Button, Text, Image, NavigationBar, Title, Icon } from '@shoutem/ui';

let screen = Dimensions.get('window')

export default class Entry extends React.Component {
    state = {
        bio: (this.props.user.bio || ''),
        pics: (this.props.user.pics || [])
    }
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
    async choosePic(i) {
        console.log('Picking pic #' + i)

        let s = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 4]
        })

        if (!s.cancelled) {
            let tpp = this.state.pics
            console.log(s.uri)
            if (i < tpp.length) tpp[i] = s.uri
            else tpp.push(s.uri)
            this.setState({ pics: tpp })
        }
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
                    leftComponent={<Icon name="close" onPress={this.props.swiping} />}
                    centerComponent={<Title>EDIT PROFILE</Title>}
                    rightComponent={<Icon name="checkbox-on" onPress={() => {
                        fetch(
                            `http://54.91.147.183:3415/api/${this.props.user.code}/bio`,
                            {
                                method: 'post',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    description: this.state.bio
                                })
                            }
                        ).then((s) => {
                            if (s.status == 200) {
                                this.props.user.bio = this.state.bio
                                for (var i = 0; i < this.state.pics.length; i++)
                                    if (this.state.pics[i].substr(0, 4) != 'http') {
                                        let p = this.state.pics[i] // nice SCOPE u got there
                                        let ext = p.split('.').reduceRight(_ => _)
                                        let type = 'image/jpeg'
                                        if (ext.indexOf('png') == 0) type = 'image/png'
                                        else if (ext.indexOf('gif') == 0) type = 'image/gif'
                                        fetch(`http://54.91.147.183:3415/api/${this.props.user.code}/propic`,
                                            {
                                                method: 'post',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    filename: p,
                                                    filetype: type
                                                })
                                            }
                                        ).then((s) => s.text()).then((t) => {
                                            console.log('Preparing to rendezvous with Bezos')
                                            const xhr = new XMLHttpRequest()
                                            xhr.open('PUT', t)
                                            xhr.onreadystatechange = function () {
                                                if (xhr.readyState === 4) {
                                                    if (xhr.status === 200)
                                                        console.log('Image successfully uploaded to S3')
                                                    else {
                                                        console.debug('S3 gave us a ' + xhr.status)
                                                        Alert.alert(
                                                            "It's not you, it's us! 😞",
                                                            "We couldn't save your pictures, please try again later."
                                                        )
                                                    }
                                                }
                                            }
                                            xhr.setRequestHeader('Content-Type', type)
                                            console.info("Launching all missiles. May his Bald Head bless us all.")
                                            console.log(p)
                                            xhr.send({
                                                uri: p,
                                                type: type,
                                                name: this.props.user.code + '-' + p.split('/').reduceRight(_ => _)
                                            })
                                        }).catch((e) => {
                                            if (e) {
                                                console.debug(e)
                                                Alert.alert(
                                                    "It's not you, it's us! 😞",
                                                    "We couldn't connect to our servers, please try again later."
                                                )
                                            }
                                        })
                                    }
                                this.props.user.pics = this.state.pics
                                this.props.swiping()
                            }
                            else Alert.alert(
                                "It's not you, it's us! 😞",
                                "We couldn't save your profile, please try again later."
                            )
                        }).catch((e) => {
                            if (e) {
                                console.debug(e)
                                Alert.alert(
                                    "Something's wrong! 😞",
                                    "We couldn't connect to our servers, please try again later."
                                )
                            }
                        })
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
                            <Button style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginRight: 10,
                                marginBottom: 10,
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.choosePic(0)
                            }}>
                                {
                                    (0 < this.state.pics.length &&
                                        <Image
                                            style={{
                                                width: screen.width / 3,
                                                height: screen.width / 3
                                            }}
                                            source={{ uri: this.state.pics[0] }}
                                        />)
                                    ||
                                    <Icon name='plus-button' style={{
                                        fontSize: 96,
                                        color: '#557'
                                    }} />
                                }
                            </Button>
                            <Button style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginBottom: 10,
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.choosePic(1)
                            }}>
                                {
                                    (1 < this.state.pics.length &&
                                        <Image
                                            style={{
                                                width: screen.width / 3,
                                                height: screen.width / 3
                                            }}
                                            source={{ uri: this.state.pics[1] }}
                                        />)
                                    ||
                                    <Icon name='plus-button' style={{
                                        fontSize: 96,
                                        color: '#557'
                                    }} />
                                }
                            </Button>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Button style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                marginRight: 10,
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.choosePic(2)
                            }}>
                                {
                                    (2 < this.state.pics.length &&
                                        <Image
                                            style={{
                                                width: screen.width / 3,
                                                height: screen.width / 3
                                            }}
                                            source={{ uri: this.state.pics[2] }}
                                        />)
                                    ||
                                    <Icon name='plus-button' style={{
                                        fontSize: 96,
                                        color: '#557'
                                    }} />
                                }
                            </Button>
                            <Button style={{
                                width: screen.width / 3,
                                height: screen.width / 3,
                                backgroundColor: '#eee',
                                borderWidth: 0.2,
                                borderColor: '#aaa',
                                justifyContent: 'center'
                            }} onPress={() => {
                                this.choosePic(3)
                            }}>
                                {
                                    (3 < this.state.pics.length &&
                                        <Image
                                            style={{
                                                width: screen.width / 3,
                                                height: screen.width / 3
                                            }}
                                            source={{ uri: this.state.pics[3] }}
                                        />)
                                    ||
                                    <Icon name='plus-button' style={{
                                        fontSize: 96,
                                        color: '#557'
                                    }} />
                                }
                            </Button>
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
                        }} placeholder={"Tell us about yourself!"} value={this.state.bio}
                            onChangeText={(t) => {
                                this.setState({ bio: t })
                            }} />
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