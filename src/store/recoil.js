import {atom} from 'recoil';

// it is the centralized store of the application 


export const onboardingState = atom({
     key : 'onboardingState',
     default: false ,
})

export const loginState = atom({
     key : 'loginState',
     default: false ,
})

export const userData = atom({
     key : 'userData',
     default: [] ,
})

export const scanDevice = atom({
     key : 'scanDevice',
     default: null ,
})



