import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { Button } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';



const App = () => {
  const [hasPermission, setHasPermission] =useState(null)
  const [scanned, setscanned]=useState(false)
  const [text, setText] =useState('Not yet scanned')
  // const { hPermission, requestPermission } = useCameraPermission() 
 useEffect(() => {
  (async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'authorized');
  })();
}, []);


  
const handleBarCodeScanned=({type, data})=>{
  setscanned(true);
  setText(data);
  console.log('Type:'+type+'\nData'+data)

}
if(hasPermission === null)
{
  return(
    <View style={styles.container}>
    <Text>Requesting for camera function</Text>
    <StatusBar style="auto"/>

    </View>
  )
  
}
if(hasPermission===false){
  return(
    <View style={styles.container}>
    <Text  style={{margin: 10}}> No access to camera</Text>
    <Button title={'Allow camera'} onPress={()=>askForCameraPermisson}/>
    <StatusBar style="auto"/>

    </View>
  )
}
 return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        
    <StatusBar style="auto"/>
    <QRCodeScanner
        onRead={!scanned ? handleBarCodeScanned : undefined}
        reactivate={false}
        showMarker={true}
        cameraStyle={{ height: 300, width: 300 }}
      />

      </View>
      <Text style={styles.maintext}>{text}</Text>

    {scanned && <Button title={'Scan Again'} onPress={()=> setscanned(false)} color='tomato'/>}

    </View>
  )
}

export default App
const styles=StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor:  'white',
    alignItems: 'center',
    justifyContent:'center',
  },
  barcodebox:{
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent:'center',
    height:300,
    width:300,
    overflow:'hidden',
    borderRadius:30,
    backgroundColor:'red',
  },
  maintext:{
    fontSize:16,
    margin:20,
  }
})