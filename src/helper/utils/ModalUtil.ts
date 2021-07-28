import { Alert } from "react-native";
import { rootNavRef } from "../../RouterPage";

function showConfirmModal(title: string, msg: string, comfirmHandle: ()=>void) {
  Alert.alert(title, msg, [{
    text: '取消',
    onPress:()=>{
      console.log('取消');
      
    }},{
    text: '确认',
    onPress:()=>{
      console.log('确认');
      comfirmHandle();
    }
  }])
}

function showLoading() {
  rootNavRef?.navigate('LoadingModal');
}

function hideLoading() {
  rootNavRef?.navigate('NotModalScrren')
}

export {
  showConfirmModal,
  showLoading,
  hideLoading
};