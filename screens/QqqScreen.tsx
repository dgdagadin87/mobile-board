import React, { useState, useEffect, useRef, PureComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

class Preview extends PureComponent<any> {
	render() {
	  const { 
		video, 
	  } = this.props;
	  if (video && video.uri) {
		const { height, width } = Dimensions.get('window');
		return (
		  <View style={styles.container}>
			<Video 
			  source={{ uri: video.uri }}
			  style={[styles.image, { height, width }]}
			  rate={1.0}
			  isMuted={false}
			  resizeMode="cover"
			  volume={0.5}
			  isLooping
			  shouldPlay
			/>
		  </View>
		);
	  }
	  return null;
	}
  }


  const styles = StyleSheet.create({
	container: {
	  position: 'absolute',
	  top: 0, 
	  left: 0,
	  width: '100%',
	  height: '100%'
	},
	image: {
	  flex: 1,
	  transform: [{
		scaleX: -1
	  }]
	}
  });


export default function App() {
  const [hasPermission, setHasPermission] = useState<any>(null);
  const [cameraRef, setCameraRef] = useState<any>(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [video, setVideo] = useState<any>(null);
  const [recording, setRecording] = useState<boolean>(false)
useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref);
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>

          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:25,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
              if(!recording){
                setRecording(true)
              let video = await cameraRef.recordAsync();
              setVideo(video)
            } else {
                setRecording(false)
                cameraRef.stopRecording()
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:25,
               borderColor: 'red',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: 'red',
                 height: 40,
                 width:40,
                 backgroundColor: 'red'}} >
              </View>
            </View>
          </TouchableOpacity>
            </View>
        </View>
      </Camera>

				<Preview video={video} />

    </View>
  );
}