import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  HeaderBackground,
  CameraWrapper,
  CameraButton,
  CameraButtonWrapper,
  ConfirmButton,
  Preview,
  CancelButtonWrapper,
  CancelButton,
} from './styles';

export default function Confirm({ route }) {
  const profile = useSelector(state => state.deliveryman.profile);
  const { id } = route.params;
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <Background>
        <Container>
          <HeaderBackground />
        </Container>
      </Background>
    );
  }

  if (hasPermission === false) {
    return (
      <Background>
        <Container>
          <HeaderBackground />
          <Text>Sem acesso a camera</Text>;
        </Container>
      </Background>
    );
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.4, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPicture(data.uri);
    }
  };

  const HandleConfirm = async () => {
    try {
      const data = new FormData();

      data.append('file', {
        type: 'image/jpeg',
        uri: picture,
        name: picture.split('/').pop(),
      });

      const response = await api.post('files', data);

      const signature_id = response.data.id;

      await api.put(`deliverymans/${profile.id}/deliveries/${id}`, {
        end_date: new Date(),
        signature_id,
      });

      showMessage({
        message: 'Parabéns',
        description: 'Entrega Confirmada com sucesso',
        type: 'info',
      });

      navigation.navigate('Deliveries');
    } catch (err) {
      console.log(picture);
      showMessage({
        message: 'Falha ao confirmar entrega',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'danger',
      });
    }
  };

  return (
    <Background>
      <Container>
        <HeaderBackground />
        <CameraWrapper>
          {!picture ? (
            <Camera
              ref={cameraRef}
              type={type}
              flashMode={Camera?.Constants?.FlashMode.off}
              style={{ flex: 1 }}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              captureAudio={false}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <CameraButtonWrapper>
                  <CameraButton onPress={() => takePicture()}>
                    <Icon name="photo-camera" size={29} color="#fff" />
                  </CameraButton>
                </CameraButtonWrapper>
              </View>
            </Camera>
          ) : (
            <>
              <Preview source={{ uri: picture }} />
              <CancelButtonWrapper>
                <CancelButton onPress={() => setPicture(null)}>
                  <Icon name="cancel" size={29} color="#fff" />
                </CancelButton>
              </CancelButtonWrapper>
            </>
          )}
        </CameraWrapper>
        <ConfirmButton onPress={() => HandleConfirm()}>Enviar</ConfirmButton>
      </Container>
    </Background>
  );
}
