import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { img_headPhone } from '../assets'

export const SideMenu = () => {

    return (
        <View style={styles.container}>
            <Image source={img_headPhone} style={styles.image} />
            <Text style={styles.text}>Nếu bạn có nhu cầu phát triển hoặc xây dựng app có thể liên hệ mình qua mail : nhutvinh14@gmail.com</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
        padding: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        height: 80,
        width: 80
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
        textAlign:'center'
    },
})