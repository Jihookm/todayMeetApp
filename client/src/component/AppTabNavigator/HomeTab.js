import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Component } from 'react/cjs/react.production.min';

const deviceWidth = Dimensions.get('window').width;
const MeetingList = () => {
  const data=[1,2,3]
  const meetList=data.map((item,index) =>(
    <TouchableOpacity style={styles.row} key={index} activeOpacity={0.75}>
      <Icon name="people-outline" size={70} style={{ paddingRight: 12}}></Icon>
      <Text style={{ fontWeight: 'bold', paddingTop: 12}}>Meeting {item}</Text>
      <Text>미팅 장소</Text>
      <Text>미팅 시간</Text>
    </TouchableOpacity>
  ));
  return <View style={styles.container}>{meetList}</View>
};
const GetDate = () => {
  let today = new Date();   
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  return (<Text style={styles.text}>{month} / {date}  Meeting</Text>
  );
}

export default class HomeTab extends Component{
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
        <Icon name='home-outline' size={30} style={{ color: tintColor }} />
    )
}
  render() {
    return (
        <View style={styles.date}>
            <GetDate />
            <Icon name="thunderstorm-outline" size={30} style={{ paddingLeft: deviceWidth - 80}}></Icon>
            <ScrollView>
              <MeetingList />
            </ScrollView>
        </View>
    );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    flexWrap: 'wrap',
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    width: deviceWidth - 80,
    height: deviceWidth / 4,
    paddingTop: 10,
    marginBottom: 3,
    marginTop: 15,
    marginLeft: 40,
    paddingLeft: 20,
    lineHeight: 30,

  },
  text: {
    marginLeft: 30,
    justifyContent: 'space-between',
    fontSize: 20,
  },
  date: {
    marginTop: 20,
  },
});