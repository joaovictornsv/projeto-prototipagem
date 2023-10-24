import {FlatList, RefreshControl, Text, View} from 'react-native';
import { styles } from './styles'
import {Button} from "native-base";
import {useEffect, useState} from "react";
import {api} from "../../../utils/api";

const renderItem = (item) => {
  return (
    <View style={styles.card}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        width: '100%'
      }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}>
          <Text style={styles.cardUserName}>{item._id}</Text>
        </View>
      </View>
    </View>
  )}
;

export default function RecentWeighingsScreen({ navigation }) {
  const [weighings, setWeighings] = useState([])
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    setRefreshing(true)
    api.get('weighings')
      .then(({data}) => {
        setWeighings(data)
        setRefreshing(false)
      })
  }, [])

    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <Text style={styles.title}>Pesagens recentes</Text>
              {refreshing && <Text>Carregando...</Text>}
              <FlatList
                data={weighings}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true)
                      api.get('weighings')
                        .then(({data}) => {
                          setWeighings(data)
                          setRefreshing(false)
                        })
                    }}
                  />
                }
                style={{ flex: 1 }}
                renderItem={({item}) => renderItem(item)}
                keyExtractor={item => item._id}
              />
                <Button onPress={() => navigation.navigate('Create')} padding="3" style={{backgroundColor: '#0C0F14', marginTop: 24}} >
                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>Nova listagem</Text>
                </Button>
            </View>
        </View>
    )
}
