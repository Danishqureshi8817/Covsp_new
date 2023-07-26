import {Platform,PermissionsAndroid,} from 'react-native'
import { useState } from 'react';
import { BleManager, Device } from 'react-native-ble-plx';

import DeviceInfo  from 'react-native-device-info';
import { requestMultiple,PERMISSIONS } from 'react-native-permissions';

type permissionCallback = (result: boolean) =>  void;

const bleManager = new BleManager()

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
    requestPermissions(cb: VoidCallback): Promise<void>;

    scanForDevices():void;

    allDevices: Device[];

}


export default function useBLE(): BluetoothLowEnergyApi{

    const [allDevices, setAllDevices] = useState<Device[]>([])

    const requestPermissions = async (cb: VoidCallback) => {

        if(Platform.OS === 'android'){

            const apiLevel = await DeviceInfo.getApiLevel();

            if(apiLevel < 31 ) {

           

            const grantedStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Bluetooth Low Energy Needs Location Permisson',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Ok',
                    buttonNeutral: 'Maybe Later'
                },
            );
            cb(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
        } else {
            const result = await requestMultiple([
                
                PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, 
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ])


            const isAllPermissionsGranted = 
               result ["android.permission.BLUETOOTH_SCAN"] === PermissionsAndroid.RESULTS.GRANTED && 
               result ["android.permission.BLUETOOTH_CONNECT"] === PermissionsAndroid.RESULTS.GRANTED &&
               result ["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED

               cb(isAllPermissionsGranted)
        }

        } else {
            cb(true)
        }
    };

    
    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
       
        devices.findIndex(device => nextDevice.id === device.id) > -1 ;



    const scanForDevices = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if(error) {
                console.log(error);
            }
            if(device && device.name?.includes('LS-4008 ')) {
                //Add Device
            setAllDevices(prevState => {

                if(!isDuplicateDevice(prevState, device)) {
                    return [...prevState, device]
                }
                 console.log("devices blu",prevState)
                return prevState;
            })
               
            }
        })
    }

    return {
        requestPermissions,
        scanForDevices,
        allDevices,
    };
}