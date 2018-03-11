/**
 * Sample React Native Compass by Sharif Hossain
 * sharifme04@live.com
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  Image,
  Animated,
  Easing
} from 'react-native';
//import Orientation from 'react-native-orientation';
//import Compass from './app/components/content';
var mSensorManager = require('NativeModules').SensorManager;

export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.state ={angle:0,  direction:'N'};
  }

 componentDidMount() {
     mSensorManager.startOrientation(100);
     DeviceEventEmitter.addListener('Orientation', (data)=> {
       var currentAngle =data.azimuth;
       const val =  Math.floor((currentAngle/ 45) + 0.5);
       const arr = ["N","NE","E", "SE","S","SW","W","NW"];
       this.setState({angle:currentAngle, direction:arr[(val % 8)] });
       //console.log('Cardinal direction is: '+arr[(val % 8)]);
      // console.log(data.azimuth);
   });
 }


  render() {
    let picture = require('./app/components/compass.jpg');
    let arrow = require('./app/components/arrow.png');
    return (
      <View style={styles.container}>
      <Text style={styles.compassTitle}>Simple Compass</Text>
      <Text style={styles.compassTitle}>{this.state.angle}</Text>
      <Text style={styles.direction}>{this.state.direction}</Text>
      <Image style={styles.arrow}source={arrow}/>
      <Animated.View style={[styles.content, {transform: [{rotateZ: String(360-this.state.angle)+'deg'}] } ]} >
        <Image style={styles.compass} source={picture}/>
      </Animated.View>
      </View>
    );
  }
}
//rotateZ: String(this.state.angle)+'deg'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  compassTitle:{
    fontSize: 20,
    marginBottom: 10
  },
  compassTitle:{
    fontSize: 20,
  },
  content: {
      flex :10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    compass:{
      width: 350,
      height: 350
    },
    arrow:{
      width: 50,
      height: 50
    },
    direction:{
      fontSize: 20,
    }
});
