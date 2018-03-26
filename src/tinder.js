import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Swiper } from 'react-native-deck-swiper'

export default class Tinder extends React.Component {
    render() {
        return (
            <Swiper
                cards={[
                    'https://i.ytimg.com/vi/GWg0ANbbL74/maxresdefault.jpg', 'https://i0.wp.com/sassydove.com/wp-content/uploads/2015/09/girls-generation-kpop-idols-beauty-fashion.png'
                ]}
                renderCard={(u) => {
                    return (
                        <View styles={styles.card}>
                            <Image
                                resizeMode={'cover'}
                                source={{ uri: u }}
                            />
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => { console.log(cardIndex) }}
                onSwipedAll={() => { console.log('onSwipedAll') }}
                cardIndex={0}
                backgroundColor={'#4FD0E9'}
                stackSize={3}
            >
                <Button onPress={() => { console.log('oulala') }} title="Press me">
                    You can press me
                    </Button>
            </Swiper>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white"
    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    }
})