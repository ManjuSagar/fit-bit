import React from 'react';
import { StyleSheet, Text, View, Linking, Button } from 'react-native';
import { Constants, WebBrowser, AuthSession } from 'expo';
import Base64 from 'Base64';

export default function App() {
  
  _handelPress = async() => {

    let redirectUrl = AuthSession.getRedirectUrl();
    let encodedUrl = encodeURIComponent(redirectUrl);
    let clientId = '22B786';
    let clientSecret = '7c3ca45c955729f1cc778c1a3b973b61';

    let result = {};
    let accessToken = '';
    try {
       result = await AuthSession.startAsync({
         authUrl:
          `https://www.fitbit.com/oauth2/authorize?response_type=token` +
          `&client_id=22B786` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}` + 
          `&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight` + 
          '&expires_in=604800'+
          '&response_type=code'
      });
    } catch(e){
      result = {}
      alert("Catched the expression");
    }
    if(result.type == 'success'){
      console.log("inside if");
      accessToken = result.params.access_token;
      var encodedData = Base64.btoa(clientId + ':' + clientSecret);
      var authorizationHeaderString = 'Authorization: Basic ' + encodedData;
      try{
        token_result = await fetch(`https://api.fitbit.com/oauth2/token&` + authorizationHeaderString +
            `&Content-Type: application/x-www-form-urlencoded`+
            `&client_id=22B786` +
            '&grant_type=authorization_code'+
            `&redirect_uri=${encodeURIComponent(redirectUrl)}` + 
            '&code= '+accessToken
        );
      } catch(e){
        alert("Catched the expression ", JSON.stringify(e));
      }
    } else {
      console.log("outside");
    }

    // let profile_url = `https://api.fitbit.com/1/user/-/profile.json`;

    // fetch(profile_url, {
    //   method: 'GET',
    //   headers: {
    //    Authorization: accessToken,
    //   }
    // })
    // .then(response => response.json())
    // .then(responseJson => {
    //   console.log("response json", responseJson);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={this._handelPress}
        title='Login'
        color='green'
        title='Connect'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
