
import 'react-native';
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
const RedditAPI = axios.create({
	baseURL:'https://www.reddit.com',
	responseType: "json",timeout: 3000,
	// headers: {
  //  'User-Agent': `${ Platform.OS }:${ appId }:1.0.0 (by /u/vygaio)`
  //  'Cookie': `${ this.cookie }`
  //  'X-Modhash': `${ this.modhash }`
 // }
})


 class Reddit  {
   placesArticlePosted = []
   activeArticleData = null
   me = null
   login = null
   articleImage = null
   all_credentials= []
   modhash=null
   cookie=null
   lastLogin=null
  //  credentials= {
  //      modhash:"",
  //      cookie:"",
  //      lastLogin:"",
  //  }
//  init(param1="posts",param2="1"){
//   return axios("https://jsonplaceholder.typicode.com/" + param1 + '/' + param2)
//         .then((response) => {
//           console.log(" response.data: ",response.data);
//           if(response.ok) {
//             return response.json();
//           } else {
//             console.log('init failed', response.statusText)
//           }
//         })
//         .catch((ex) => {
//           throw new Error('fetch failed' + ex)
//         });
// }








  FetchURLOnReddit(articleURL){
    return RedditAPI(`/api/info.json?jsonp&url=${articleURL}`)
    .then((json) => {
        let res= {
          data: _.get(json,'data.data.children',[]).map(p=>_.get(p,'data',[])),
          receivedAt: Date.now()
        }
        this.activeArticleData=res
        return res
      })
  }

  Me(){
    return RedditAPI(`/api/me.json`)
    .then((json) => {
      console.log("me json: ",json);
        // let res= {
        //   data: _.get(json,'data.data.children',[]).map(p=>_.get(p,'data',[])),
        //   receivedAt: Date.now()
        // }
        this.me=json
        return json
      })
  }

  Comment(type="t3_",id,text){
    https://www.reddit.com
    return RedditAPI.post(`/api/comment?parent=t3_5x5rea&text=this%20testing`)
    .then((json) => {
      console.log(" json: ",json);
      return _.get(json,'jquery[14][3][0]')
  return json
      })
  }

  SubmitTextPost(subreddit="test",text){

    return RedditAPI.post(`/api/submit?sr=${subreddit}&text=${encodeURI(text)}`)
    .then((json) => {
      console.log(" json: ",json);
      return _.get(json,'jquery[14][3][0]')
      })
  }








  Login(username,passord){
    var params = new URLSearchParams();
    params.append('user', username);
    params.append('passwd', passord);
    params.append('api_type', 'json');
    return  axios.post('https://ssl.reddit.com/api/login',params)
    .then((json) => {
      console.log(" json: ",json);
// console.log(JSON.stringify(_.get(json,'data.json.error',"")))
      // return _.get(json,'data.json.error',[]).map(p=>_.get(p,'data',[])),
      let credentials= {
          username:username,
          modhash:_.get(json,'data.json.data.modhash'),
          cookie:_.get(json,'data.json.data.cookie'),
          lastLogin:Date.now(),
      }
      this.credential=credentials
        return credentials
      })
  }



  GetActiveCredentials(){
    if(_.get(this.credentials,"modhash").length){return Promise.resolve(this.credentials)}
    else{
      return new Promise((resolve, reject) => {
          return AppStorage.getItem("active_reddit_credentials").then((credentials) => {
            if(!credentials)reject("Nice Try Sicko, You're not logged in Reddit 🤣")
        this.credentials=_.defaultsDeep({lastLogin:Date.now()},credentials)
        resolve(this.credentials)
      })
    });
    }
  }

GetAllCredentials(){
  // if(_.get(this.all_credentials,[]).length){return Promise.resolve(this.all_credentials)}
  // else{
    return new Promise((resolve, reject) => {
        return AppStorage.getItem("all_reddit_credentials").then((all_credentials) => {
          if(!all_credentials)reject("No Reddit Accounts Added")
          this.all_credentials=all_credentials
          resolve(this.all_credentials)
    })
  });
  // }
}

  SetActiveCredentials(credentials){
    if(_.get(credentials,"username").length)
    AppStorage.setItem("active_reddit_credentials", credentials)
    //add new credentials to all_reddit_credentials array
     AppStorage.getItem("all_reddit_credentials").then((old_credentials_array) => {
      let updated_credentials_array= _.unionBy(old_credentials_array,[credentials], 'username');
      // this.credentials_size= updated_credentials_array.length
      AppStorage.setItem("all_reddit_credentials", updated_credentials_array)
    })

  }



}

const ReactNativeReddit= new Reddit()
export default ReactNativeReddit
