  /* @flow */

  import React, { Component } from 'react';
  import {
  View,
  Text,
  Dimensions,
  FlatList,
  SearchBar,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  StyleSheet,
  } from 'react-native';
  import Ionicons from 'react-native-vector-icons/Ionicons'
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

  const {width, height} = Dimensions.get('window');
  import Loading from 'react-native-spinkit';

  import faker from 'faker';
  import _ from 'lodash';

    let FakePersonArray = new _.times(15,(i)=>{
      return {
        id:i,
        name:faker.name.findName(),
        avatar:faker.internet.avatar(),
        group:_.sample(['Work','Friend','Acquaintance','Other']),
        email:faker.internet.email(),
      }
    })

    let ITEM_HEIGHT=100

  export default class FrontPage extends Component {
  constructor(props){
     super(props);
      this.state = {
        isLoading:false,
        activeId:0,
        activeItem:null,
        // FlatListItems:[],
        FlatListItems:FakePersonArray,
      };

      this.ListHeaderComponent=this.ListHeaderComponent.bind(this)
  this.ListFooterComponent=this.ListFooterComponent.bind(this)
  this.ListEmptyComponent=this.ListEmptyComponent.bind(this)
  this.ItemSeparatorComponent=this.ItemSeparatorComponent.bind(this)
  this.renderItem=this.renderItem.bind(this)
  this.getFlatListItems=this.getFlatListItems.bind(this)
  this.scrollToEnd=this.scrollToEnd.bind(this)
  this.scrollTo=this.scrollTo.bind(this)
    }


  getFlatListItems(){
  this.setState({isLoading:true})
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  setTimeout(function() {
  this.setState({
    isLoading:false,
    // FlatListItems:[{"id":1,"name":"Bernie Sanders"},{"id":2,"name":"Al Frankin"},{"id":3,"name":"Elizabeth Warren"},{"id":4,"name":"Cory Booker"}]
    FlatListItems:FakePersonArray
  })
  }.bind(this), 2000);
  }
  ListEmptyComponent=()=>{return (<View style={{flex: 1,height,width,justifyContent: "center",alignItems: "center",}}><TouchableOpacity onPress={()=>this.getFlatListItems()}><Text style={{color:'rgba(0,0,0,0.5)',fontSize: 20,textAlign: "center",margin: 10,}}>Nothing is Here!</Text>
  <Text style={{color:'rgba(0,0,0,0.5)',fontSize: 15,textAlign: "center",}}>Try Again?</Text>
  </TouchableOpacity></View>)}

  ItemSeparatorComponent = () => {return (<View style={{height: 1,width: "86%",backgroundColor: "#CED0CE",marginLeft: "14%"}}/>)}

   ListHeaderComponent=(heading="Heading")=>{return (<View style={{padding: 10}}><Text style={{fontSize: 35,color: '#444',margin: 5,fontWeight: '700'}}>{heading}</Text><View style={{width: 50,borderBottomWidth: 1,borderColor: '#e3e3e3',margin: 5,marginTop: 5,marginBottom: 30}}/></View>)}
   ListFooterComponent = () => {
     // if (!this.state.isLoading) return null;
     if (!this.state.isLoading){
        return (<View style={{flex: 1,height,width,justifyContent: "center",alignItems: "center",}}>
     <Loading type={"ThreeBounce"} color="white" isVisible={this.state.isLoading} />
     </View>);
     return (
       <View style={[s.container,]}>
         {/* <ActivityIndicator animating size="large" /> */}
       <Loading type={"ThreeBounce"} color="white" isVisible={this.state.isLoading} />
       </View>
     );
   }
   }

  setItemAsActive(activeItem){
  console.log(" setItemAsActive: item ",activeItem);
  this.setState({scrollToItemRef:activeItem})
  this.setState({activeItem:activeItem.item})
  }
     renderItem(o,i){
       return (<View style={{flex: 1,height,justifyContent: "center",alignItems: "center",}}>

         <TouchableOpacity onPress={()=>this.setItemAsActive(o)} style={[s.renderItem,
           // (activeId===o.item.id)?{backgroundColor:"#488aff"}
           (this.state.activeId===o.item.id)?{backgroundColor:"blue"}
                                       :{backgroundColor:"red"},
           (this.state.activeId!==o.item.id)?{borderColor: 'rgba(0,0,0,.3)',shadowColor: 'rgba(0,0,0,.3)'}
                                       :{borderColor: 'rgba(255,255,255,1)',shadowColor: 'rgba(255,255,255,1)'}
           ]}>
         <Image resizeMode="center" style={s.image} source={{uri:`https://robohash.org/${o.item.name}?size=350x350&set=set1`}}/>
       <Text style={[s.name,
         (this.state.activeId===o.item.id)?{color:"#fff"}
                                     :{color:"green"},
           ]}>{(o.item.name)?o.item.name:"no name attrabute"}</Text>
       </TouchableOpacity>
     </View>)

     }
     clearList(){
       this.setState({
         FlatListItems:[]
       })
     }

  onEndReached(o){

  }

  scrollTo(ref="FlatListRef",x=0,y=0){
  // console.log(" this.refs: ",this.refs[ref]);
  console.log(" this.state.scrollToItemRef: ",this.state.scrollToItemRef);
  // try {this.refs[ref].scrollToIndex({x:0,y:0,amimated:true})} catch (e) {console.log(" e: ",e);}
  // try {this.refs[ref].scrollToIndex(1)} catch (e) {console.log(" e: ",e);}
  try {this.refs[ref].scrollToItem(this.state.scrollToItemRef)} catch (e) {console.log(" e: ",e);}
  // try {this.refs[ref].scrollToOffset({x:0,y:1000,amimated:true})} catch (e) {console.log(" e: ",e);}
  }
  scrollToStart(ref="FlatListRef",x=0,y=0){
  try {this.refs[ref].scrollToOffset({x,y,amimated:true})} catch (e) {console.log(" e: ",e);}
  }
  scrollToEnd(ref="FlatListRef"){
  try {this.refs[ref].scrollToEnd()} catch (e) {console.log(" e: ",e);}
  }
  render() {
  return (<View style={[s.container]}>
  <View style={{flex: 1,height,width,justifyContent: "center",alignItems: "center",
  backgroundColor: "green",}}>





          {!this.state.activeItem
              ?(
              <View style={{justifyContent: 'center',alignItems: "center",flex: 1,}}>
  <Text style={{textAlignVertical: "center", textAlign: "center",fontSize: 20,}}>No Active Item</Text>
              </View>
              )
              : (<TouchableOpacity onPress={()=>this.setItemAsActive(o)} style={[s.renderItem,
                {borderColor: 'rgba(255,255,255,1)',shadowColor: 'rgba(255,255,255,1)'}
                  ]} onPress={()=>alert(JSON.stringify(this.state.activeItem))}>
                <Image resizeMode="center" style={s.image} source={{uri:`https://robohash.org/${_.get(this.state.activeItem,"name","default")}?size=350x350&set=set1`}}/>
              <Text style={[s.name,{color:"#fff"}]}>
  {_.get(this.state.activeItem,"name","No Default")}

  </Text>
              </TouchableOpacity>)
          }
  <TouchableOpacity onPress={()=>this.clearList()}
      style={{position:"absolute",backgroundColor:"red",right:0,bottom:0,margin:10,zIndex:3,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
      <Ionicons name={"ios-trash-outline"} size={25} color="rgba(0,0,0,0.5)"/>

  </TouchableOpacity>
  </View>
  <View style={{flex: 1,height,width}}>


  <FlatList

    ref={"FlatListRef"}
         //ListHeaderComponent={this.ListHeaderComponent}
         //ListFooterComponent={this.ListFooterComponent}
         ListEmptyComponent={this.ListEmptyComponent}
        //ItemSeparatorComponent={this.ItemSeparatorComponent}
         initialNumToRender={5}
         horizontal
         getItemLayout={(data, index) => (
           {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
          )}
         //onEndReached={this._onEndReached}
         //onRefresh={this._onRefresh}
         onRefresh={(o)=>alert("onRefresh:",o)}
         initialScrollIndex={0}

         refreshing={this.state.isLoading}
         //initialScrollIndex={_.chain(ARRAY).map("key").indexOf("value").value()}
         //initialScrollIndex={_.indexOf(ARRAY,_.find(ARRAY,(o)=>o.id===SOMEID}))}
         //getItemLayout={(data, index) => ({length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index})}
          onEndReached={(o)=>this.onEndReached}
          keyExtractor={(o, i) => o.id}
        data={this.state.FlatListItems}
        scrollRenderAheadDistance={width*2}
        //data={[{"id":1,"name":"Bernie Sanders"},{"id":2,"name":"Al Frankin"},{"id":3,"name":"Elizabeth Warren"},{"id":4,"name":"Cory Booker"}]}
        renderItem={this.renderItem}
      />

      <TouchableOpacity onPress={()=>this.clearList()}
                style={{position:"absolute",backgroundColor:"red",right:35,top:0,margin:10,zIndex:3,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
                <Ionicons name={"ios-refresh-outline"} size={25} color="rgba(0,0,0,0.5)"/>
        </TouchableOpacity>
      <TouchableOpacity onPress={()=>this.clearList()}
                style={{position:"absolute",backgroundColor:"red",right:0,top:0,margin:10,zIndex:3,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
                <Ionicons name={"ios-trash-outline"} size={25} color="rgba(0,0,0,0.5)"/>
        </TouchableOpacity>
    <TouchableOpacity onPress={()=>this.scrollToStart("FlatListRef",0,0)}
            style={{position:"absolute",bottom:10,left:10,flex:1,zIndex:3,width:35,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
            <Ionicons name={"ios-arrow-back-outline"} size={25} color="rgba(0,0,0,0.5)"/>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={()=>{if(this.refs.FlatListRef.scrollToEnd)this.refs.FlatListRef.scrollToEnd()}} */}
    {/* <TouchableOpacity onPress={()=>console.log(this.refs)} */}
    <TouchableOpacity onPress={()=>this.scrollToEnd("FlatListRef")}
            style={{position:"absolute",bottom:10,right:10,flex:1,zIndex:3,width:35,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
            <Ionicons name={"ios-arrow-forward-outline"} size={25} color="rgba(0,0,0,0.5)"/>
    </TouchableOpacity>
    {/* <TouchableOpacity onPress={()=>{if(this.refs.FlatListRef.scrollToIndex)this.refs.FlatListRef.scrollToIndex(4)}} */}
      <TouchableOpacity onPress={()=>this.scrollTo("FlatListRef",4*ITEM_HEIGHT,4*ITEM_HEIGHT)}
            style={{position:"absolute",bottom:10,right:width/3,flex:1,zIndex:3,width:35,height:35,alignItems:"center",justifyContent:"center",backgroundColor:"transparent"}}>
  <Text style={{textAlignVertical: "center", textAlign: "center",fontSize: 20,}}>4</Text>
    </TouchableOpacity>
    </View>
  </View>)

  }
  }

  const s = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text:{
  fontWeight:"600",
  fontSize:100,
  textAlignVertical: "center", textAlign: "center",
  },
  renderItem:{
  width:ITEM_HEIGHT,

  height:ITEM_HEIGHT,
  margin:10,
  justifyContent:"center",
  alignItems:"center",
  borderRadius:50,
  borderWidth: 3,
  shadowOffset: {
  width: 3,
  height: 3
  },
  shadowRadius: 6,
  shadowOpacity: 0.8
  },
  name:{
  position:"absolute",
  bottom:-20,left:0,right:0,
  backgroundColor:"transparent",
  fontSize: 12,
  width:100,
  textAlign: "center",
  fontWeight:"500",

  },
  image:{
  width: 96,
  height: 96,
  borderRadius: 48,
  },
  });
