import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'; // Import CameraView
import { checkQRCode } from '../api/api'; // Adjust this import based on your project structure
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';

type ScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ScannerScreen'>;
type ScannerScreenRouteProp = RouteProp<RootStackParamList, 'ScannerScreen'>;

type Props = {
    navigation: ScannerScreenNavigationProp;
    route: ScannerScreenRouteProp;
};

const ScannerScreen: React.FC<Props> = ({ navigation, route }) => {
    const [facing, setFacing] = useState<CameraType>('back'); // State for camera facing
    const [permission, requestPermission] = useCameraPermissions(); // Use custom hook for camera permissions
    const [scanned, setScanned] = useState(false);
    const { eventId } = route.params;

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission(); // Request permission if not granted
        }
    }, [permission, requestPermission]);

    const handleBarCodeScanned = async ({ data }: { data: string }) => {
        if (scanned) return;
        setScanned(true);

        try {
            const response = await checkQRCode(eventId, data);
            if (response.status === "valid" && response.ticketInfo) {
                navigation.navigate('SuccessScreen', { ticketInfo: response.ticketInfo });
            } else {
                navigation.navigate('ErrorScreen', { reason: response.reason || "Invalid ticket" });
            }
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        }
    };

    if (!permission) return <Text>Requesting camera permission...</Text>;
    if (!permission.granted) return (
        <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="Grant Permission" />
        </View>
    );

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFill} // Use absolute fill for the camera
                facing={facing} // Specify camera facing
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Handle barcode scanning
            />
            {scanned && (
                <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
            )}
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            {/* Button to toggle camera facing */}
            <Button title={`Switch to ${facing === 'back' ? 'Front' : 'Back'} Camera`} onPress={() => setFacing(current => (current === 'back' ? 'front' : 'back'))} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default ScannerScreen;
