import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class APIDataFetching extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Name', 'User Name', 'E-mail'],
          widthArr: [130, 130, 130],
          data: []
        }

      }

   getData() {
        
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => {
        this.setState({ data })
    })
    .catch((error) => console.error(error));

   /*  fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        
    }) */
    


    }


  render() {
    const tableData = this.state.data.map(record => ([record.name, record.username, record.email]));
 

    return (
      <View style={styles.container}>
        <Text style={styles.textHead}> APIDataFetching </Text>
        <Button  style={styles.button} rounded success
            onPress={this.getData.bind(this)}
            
        >
            <Text>Load Data</Text>
          </Button>

        <ScrollView horizontal={true} style={styles.table}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={this.state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e'
    },
    textHead: {
        color: 'white',
        fontFamily: 'bold',
        fontSize: 50,
        textAlign: 'center',
        marginTop: 15
    },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    button: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        marginLeft: 145
    },
    table: {
        marginLeft: 10
    }
})
